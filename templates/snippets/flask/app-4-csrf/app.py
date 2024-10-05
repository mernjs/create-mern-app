from flask import Flask, jsonify
from mongoengine import connect
from flask_jwt_extended import JWTManager
from routes.api import api_bp
from config import Config
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_limiter import RateLimitExceeded

app = Flask(__name__)

connect(host=Config.MONGO_URI)

app.config.from_object(Config)

JWTManager(app)

limiter = Limiter(
    key_func=get_remote_address,  
    app=app,
    default_limits=["100 per minute"]
)

app.register_blueprint(api_bp)

@app.errorhandler(RateLimitExceeded)
def ratelimit_error(e):
    return jsonify({"msg": "Rate limit exceeded. Please try again later."}), 429

if __name__ == '__main__':
    app.run(debug=True)
