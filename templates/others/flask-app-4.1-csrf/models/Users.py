from werkzeug.security import generate_password_hash, check_password_hash
from mongoengine import Document, fields

class User(Document):
    meta = {'collection': 'users'}
    
    firstName = fields.StringField(required=True)
    email = fields.StringField(required=True, unique=True)
    password = fields.StringField(required=True)
    profile_pic = fields.StringField(required=False)
    reset_token = fields.StringField()

    # Hash the password before saving
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # Check the hashed password
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def to_dict(self):
        return {
            "id": str(self.id), 
            "email": self.email,
            "firstName": self.firstName
        }
