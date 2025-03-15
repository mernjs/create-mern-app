from flask import Flask
from flask_pymongo import PyMongo
from routes.api import api_bp  # Ensure this import works

app = Flask(__name__)

# MongoDB configuration
app.config["MONGO_URI"] = ""
mongo = PyMongo(app)
app.config['MONGO'] = mongo

# Register blueprint
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)
