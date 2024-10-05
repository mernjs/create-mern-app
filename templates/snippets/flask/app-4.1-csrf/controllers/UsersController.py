from utils.utils import get_current_user, upload_to_s3, api_response
from utils.mail import send_mail, allowed_file
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from flask import request, current_app
from flask_restful import Resource
from models.Users import User
from math import ceil
import os

class UsersController(Resource):

    @jwt_required(optional=True)
    def getUsers(self):
        try:
            page = int(request.args.get('page', 1))
            limit = int(request.args.get('limit', 10))
            search = request.args.get('search', '')

            skip = (page - 1) * limit

            query = {}
            if search:
                query['firstName'] = {'$regex': search, '$options': 'i'}

            users_query = User.objects(__raw__=query).only('id', 'firstName', 'email')

            total_users = users_query.count()

            users = users_query.skip(skip).limit(limit)

            result = [{'id': str(user.id), 'firstName': user.firstName, 'email': user.email} for user in users]

            total_pages = ceil(total_users / limit)

            data = {
                'users': result,
                'total_pages': total_pages,
                'current_page': page,
                'total_users': total_users
            }
            return api_response(message="Success", status_code=200, data=data)
        except Exception as e:
            return api_response(message=e, status_code=500)
        
    @jwt_required()
    def getUserDetails(self, user_id):
        try:
            user = User.objects(id=user_id).only('id', 'firstName', 'email').first()
            if user:
                data = {'id': str(user.id), 'firstName': user.firstName, 'email': user.email}
                return api_response(message="Success", status_code=200, data=data)
            return api_response(message="User not found", status_code=400)
        except Exception as e:
            return api_response(message=e, status_code=500)

    @jwt_required()
    def createUsers(self):
        try:
            data = request.json
            user = User(firstName=data['firstName'], email=data['email'], password=data['password'])
            user.save()
            send_mail('welcome_email', "Welcome to our platform", user)
            return api_response(message="Success", status_code=200)
        except KeyError as e:
            return api_response(message=e, status_code=400)
        except Exception as e:
            return api_response(message=e, status_code=500)

    @jwt_required()
    def updateUsers(self, user_id):
        try:
            user = User.objects(id=user_id).first()
            if not user:
                return api_response(message="User not found", status_code=400)
            data = request.json
            user.update(firstName=data['firstName'], email=data['email'])
            return api_response(message="Success", status_code=200, data=user)
        except KeyError as e:
            return api_response(message=e, status_code=400)
        except Exception as e:
            return api_response(message=e, status_code=500)

    @jwt_required()
    def deleteUsers(self, user_id):
        try:
            user = User.objects(id=user_id).first()
            if not user:
                return api_response(message="User not found", status_code=400)
            user.delete()
            return api_response(message="Success", status_code=200, data=user)
        except Exception as e:
            return api_response(message=e, status_code=500)
    
    @jwt_required()
    def upload_profile_pic(self):
        if 'profilePic' not in request.files:
            return api_response(message="No file part", status_code=400)
        
        file = request.files['profilePic']
        
        if file.filename == '':
            return api_response(message="No file selected", status_code=400)
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            
            current_user = get_current_user()
            user_id = current_user.get('id')
            user = User.objects(id=user_id).first()
            if not user:
                return api_response(message="User not found", status_code=400)

            user.update(set__profile_pic=file_path)
            
            return api_response(message="Success", status_code=200, data={file_path: file_path})
        
        return api_response(message="File type not allowed", status_code=400)

    @jwt_required()
    def upload_profile_pics3(self):
        if 'profilePic' not in request.files:
            return api_response(message="No file part", status_code=400)
        
        file = request.files['profilePic']
        
        if file.filename == '':
            return api_response(message="No file selected", status_code=400)
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)

            file_url = upload_to_s3(file, f"business/profile-pictures/29977/{filename}")

            if not file_url:
                return api_response(message="Failed to upload file to S3", status_code=500)

            current_user = get_current_user()
            user_id = current_user.get('id')
            user = User.objects(id=user_id).first()
            if not user:
                return api_response(message="User not found", status_code=400)

            user.update(set__profile_pic=file_url)
            
            return api_response(message="Success", status_code=200, data=user)
        
        return api_response(message="File type not allowed", status_code=400)
