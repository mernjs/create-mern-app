from flask import Blueprint
from flask_restful import Api
from controllers.UsersController import UsersController
from controllers.AuthController import AuthController

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api_bp.add_url_rule('/auth/register', view_func=AuthController().register, methods=['POST'])
api_bp.add_url_rule('/auth/login', view_func=AuthController().login, methods=['POST'])
api_bp.add_url_rule('/auth/forgot-password', view_func=AuthController().forgot_password, methods=['POST'])
api_bp.add_url_rule('/auth/verify-forgot-password-token', view_func=AuthController().verify_forgot_password_token, methods=['POST'])
api_bp.add_url_rule('/auth/reset-forgot-password', view_func=AuthController().reset_forgot_password, methods=['POST'])

api_bp.add_url_rule('/users', view_func=UsersController().getUsers, methods=['GET'])
api_bp.add_url_rule('/users', view_func=UsersController().createUsers, methods=['POST'])
api_bp.add_url_rule('/users/<string:user_id>', view_func=UsersController().getUserDetails, methods=['GET'])
api_bp.add_url_rule('/users/<string:user_id>', view_func=UsersController().updateUsers, methods=['PUT'])
api_bp.add_url_rule('/users/<string:user_id>', view_func=UsersController().deleteUsers, methods=['DELETE'])
api_bp.add_url_rule('/users/profile-pic', view_func=UsersController().upload_profile_pic, methods=['POST'])