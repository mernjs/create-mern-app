from flask import request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, get_csrf_token
from werkzeug.security import check_password_hash, generate_password_hash
import random
import string
from models.Users import User

class AuthController:

    def register(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            firstName = data.get('firstName')

            if User.objects(email=email).first():
                return jsonify({"msg": "email already taken"}), 409

            hashed_password = generate_password_hash(password)
            new_user = User(email=email, password=hashed_password, firstName=firstName)
            new_user.save()

            return jsonify({"msg": "User registered successfully"}), 201
        except Exception as e:
            print(f"Error: {e}") 
            return jsonify({"msg": "An error occurred during registration"}), 500

    def login(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            user = User.objects(email=email).first()
            if not user or not check_password_hash(user.password, password):
                return jsonify({"msg": "Invalid email or password"}), 401

            # access_token = create_access_token(identity=str(user.id), expires_delta=datetime.timedelta(days=1))

            access_token = create_access_token(identity=str(user.id))
            csrf_token = get_csrf_token(access_token)

            response = jsonify({
                "msg": "Login successful",
                "access_token": access_token,
                "csrf_token": csrf_token
            })
            
            set_access_cookies(response, access_token)

            return response, 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"msg": f"An error occurred during login: {e}"}), 500

    def forgot_password(self):
        try:
            data = request.get_json()
            email = data.get('email')

            user = User.objects(email=email).first()
            if not user:
                return jsonify({"msg": "User not found"}), 404
            
            reset_token = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
            user.update(set__reset_token=reset_token)

            return jsonify({"msg": "Reset token generated", "reset_token": reset_token}), 200
        except Exception as e:
            print(f"Error: {e}") 
            return jsonify({"msg": "An error occurred while generating reset token"}), 500
     
    def verify_forgot_password_token(self):
        try:
            data = request.get_json()
            reset_token = data.get('reset_token')
            user = User.objects(reset_token=reset_token).first()

            if user:
                return jsonify({"msg": "Reset token is valid", "user_id": str(user.id)}), 200
            else:
                return jsonify({"msg": "Invalid or expired reset token"}), 400
        except Exception as e:
            print(f"Error: {e}") 
            return jsonify({"msg": "An error occurred while verifying reset token"}), 500

    def reset_forgot_password(self):
        try:
            data = request.get_json()
            reset_token = data.get('reset_token')
            new_password = data.get('new_password')

            user = User.objects(reset_token=reset_token).first()
            if not user:
                return jsonify({"msg": "Invalid reset token"}), 400

            hashed_password = generate_password_hash(new_password)
            user.update(set__password=hashed_password, set__reset_token=None)

            return jsonify({"msg": "Password reset successfully"}), 200
        except Exception as e:
            print(f"Error: {e}") 
            return jsonify({"msg": "An error occurred while resetting password"}), 500
