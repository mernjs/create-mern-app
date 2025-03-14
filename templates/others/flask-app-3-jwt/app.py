from flask import Flask
from mongoengine import connect
from flask_jwt_extended import JWTManager
from routes.api import api_bp 
from config import Config

app = Flask(__name__)

connect(host=Config.MONGO_URI)

app.config.from_object(Config)

JWTManager(app)

app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)
