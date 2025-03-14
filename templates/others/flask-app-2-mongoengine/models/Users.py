from mongoengine import Document, fields

class User(Document):
    meta = {'collection': 'users'} 
    firstName = fields.StringField(required=True)
    email = fields.StringField(required=True)
