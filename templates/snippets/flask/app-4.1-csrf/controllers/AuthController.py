from utils.utils import generate_tokens, api_response
from flask_jwt_extended import set_access_cookies
from flask import request, jsonify
from models.Users import User
import random
import string

class AuthController:

    def register(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            firstName = data.get('firstName')

            if User.objects(email=email).first():
                return api_response(message="Email already taken", status_code=409)

            user = User(email=email, firstName=firstName)
            user.set_password(password) 
            user.save()

            access_token, csrf_token = generate_tokens(user.to_dict()) 
            
            if not access_token or not csrf_token:
                return api_response(message="Failed to generate tokens", status_code=500)

            data = {
                "msg": "User registered successfully",
                "user": user.to_dict(),
                "access_token": access_token,
                "csrf_token": csrf_token
            }
            
            set_access_cookies(jsonify(data), access_token)

            return api_response(message="Success", status_code=200, data=data)
        except Exception as e:
            return api_response(message=e, status_code=500)

    def login(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            user = User.objects(email=email).first()
            if not user or not user.check_password(password):
                return api_response(message="Invalid email or password", status_code=401)

            access_token, csrf_token = generate_tokens(user.to_dict()) 
            
            if not access_token or not csrf_token:
                return api_response(message="Failed to generate tokens", status_code=500)

            data = {
                "msg": "Login successful",
                "user": user.to_dict(),
                "access_token": access_token,
                "csrf_token": csrf_token
            }
            
            set_access_cookies(jsonify(data), access_token)

            return api_response(message="Success", status_code=200, data=data)
        except Exception as e:
            return api_response(message=e, status_code=500)

    def forgot_password(self):
        try:
            data = request.get_json()
            email = data.get('email')

            user = User.objects(email=email).first()
            if not user:
                return api_response(message="User not found", status_code=400)
            
            reset_token = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
            user.update(set__reset_token=reset_token)
            return api_response(message="Success", status_code=200, data={"reset_token": reset_token})
        except Exception as e:
            return api_response(message=e, status_code=500)
     
    def verify_forgot_password_token(self):
        try:
            data = request.get_json()
            reset_token = data.get('reset_token')
            user = User.objects(reset_token=reset_token).first()

            if user:
                return api_response(message="Success", status_code=200, data={"user_id", str(user.id)})
            else:
                return api_response(message="Invalid or expired reset token", status_code=400)
        except Exception as e:
            return api_response(message=e, status_code=500)

    def reset_forgot_password(self):
        try:
            data = request.get_json()
            reset_token = data.get('reset_token')
            new_password = data.get('new_password')

            user = User.objects(reset_token=reset_token).first()
            if not user:
                return api_response(message="Invalid reset token", status_code=400)

            user.set_password(new_password)
            user.update(set__reset_token=None)

            return api_response(message="Success", status_code=200)
        except Exception as e:
            return api_response(message=e, status_code=500)

