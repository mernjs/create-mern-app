from flask import jsonify, request
from flask_restful import Resource
from models.Users import User

class UsersController(Resource):
    def getUsers(self, user_id=None):
        users = User.objects.only('id', 'firstName', 'email')
        result = [{'id': str(user.id), 'firstName': user.firstName, 'email': user.email} for user in users]
        return jsonify(result)

    def getUserDetails(self, user_id=None):
        user = User.objects(id=user_id).only('id', 'firstName', 'email').first()
        if user:
            return jsonify({'id': str(user.id), 'firstName': user.firstName, 'email': user.email})
        return jsonify({'message': 'User not found'}), 404

    def createUsers(self):
        data = request.json
        user = User(firstName=data['firstName'], email=data['email'])
        user.save()
        return jsonify({'message': 'User created', 'id': str(user.id)})

    def updateUsers(self, user_id):
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        data = request.json
        user.update(firstName=data['firstName'], email=data['email'])
        return jsonify({'message': 'User updated'})

    def deleteUsers(self, user_id):
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        user.delete()
        return jsonify({'message': 'User deleted'})
