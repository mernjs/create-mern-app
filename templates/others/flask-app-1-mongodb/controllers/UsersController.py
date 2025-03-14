from flask import jsonify, request, current_app
from flask_restful import Resource
from bson.objectid import ObjectId

class UsersController(Resource):
    def getUsers(self, user_id=None):
        mongo = current_app.config['MONGO']
        if user_id:
            user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
            if user:
                return jsonify({'id': str(user['_id']), 'firstName': user['firstName'], 'email': user['email']})
            return jsonify({'message': 'User not found'}), 404
        users = mongo.db.users.find()
        result = [{'id': str(user['_id']), 'firstName': user['firstName'], 'email': user['email']} for user in users]
        return jsonify(result)

    def createUsers(self):
        data = request.json
        mongo = current_app.config['MONGO']
        user_id = mongo.db.users.insert_one({
            'firstName': data['firstName'],
            'email': data['email']
        }).inserted_id
        return jsonify({'message': 'User created', 'id': str(user_id)})

    def updateUsers(self, user_id):
        mongo = current_app.config['MONGO']
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({'message': 'User not found'}), 404
        data = request.json
        mongo.db.users.update_one({'_id': ObjectId(user_id)}, {'$set': {
            'firstName': data['firstName'],
            'email': data['email']
        }})
        return jsonify({'message': 'User updated'})

    def deleteUsers(self, user_id):
        mongo = current_app.config['MONGO']
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({'message': 'User not found'}), 404
        mongo.db.users.delete_one({'_id': ObjectId(user_id)})
        return jsonify({'message': 'User deleted'})
