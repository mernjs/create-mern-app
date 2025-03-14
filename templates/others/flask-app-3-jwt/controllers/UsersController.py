from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, request, current_app
from werkzeug.utils import secure_filename
from flask_restful import Resource
from models.Users import User
import os

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

class UsersController(Resource):

    @jwt_required()
    def getUsers(self):
        try:
            users = User.objects.only('id', 'firstName', 'email')
            result = [{'id': str(user.id), 'firstName': user.firstName, 'email': user.email} for user in users]
            return jsonify(result)
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'An error occurred while fetching users'}), 500

    @jwt_required()
    def getUserDetails(self, user_id):
        try:
            user = User.objects(id=user_id).only('id', 'firstName', 'email').first()
            if user:
                return jsonify({'id': str(user.id), 'firstName': user.firstName, 'email': user.email})
            return jsonify({'msg': 'User not found'}), 404
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'An error occurred while fetching user details'}), 500

    @jwt_required()
    def createUsers(self):
        try:
            data = request.json
            user = User(firstName=data['firstName'], email=data['email'])
            user.save()
            return jsonify({'msg': 'User created', 'id': str(user.id)})
        except KeyError as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'Missing required fields'}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'An error occurred while creating user'}), 500

    @jwt_required()
    def updateUsers(self, user_id):
        try:
            user = User.objects(id=user_id).first()
            if not user:
                return jsonify({'msg': 'User not found'}), 404
            data = request.json
            user.update(firstName=data['firstName'], email=data['email'])
            return jsonify({'msg': 'User updated'})
        except KeyError as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'Missing required fields'}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'An error occurred while updating user'}), 500

    @jwt_required()
    def deleteUsers(self, user_id):
        try:
            user = User.objects(id=user_id).first()
            if not user:
                return jsonify({'msg': 'User not found'}), 404
            user.delete()
            return jsonify({'msg': 'User deleted'})
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'msg': 'An error occurred while deleting user'}), 500
    
    @jwt_required()
    def upload_profile_pic(self):
        if 'profilePic' not in request.files:
            return jsonify({"msg": "No file part"}), 400
        
        file = request.files['profilePic']
        
        if file.filename == '':
            return jsonify({"msg": "No selected file"}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            
            user_id = get_jwt_identity()
            user = User.objects(id=user_id).first()
            if not user:
                return jsonify({"msg": "User not found"}), 404

            user.update(set__profile_pic=file_path)
            
            return jsonify({"msg": "File uploaded successfully", "file_path": file_path}), 201
        
        return jsonify({"msg": "File type not allowed"}), 400
