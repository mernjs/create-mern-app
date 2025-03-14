from flask import Blueprint
from flask_restful import Api
from controllers.UsersController import UsersController

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api_bp.add_url_rule('/users', view_func=UsersController().getUsers, methods=['GET'])
api_bp.add_url_rule('/users', view_func=UsersController().createUsers, methods=['POST'])
api_bp.add_url_rule('/users/<string:user_id>', view_func=UsersController().updateUsers, methods=['PUT'])
api_bp.add_url_rule('/users/<string:user_id>', view_func=UsersController().deleteUsers, methods=['DELETE'])
