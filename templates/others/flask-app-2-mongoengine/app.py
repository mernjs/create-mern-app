from flask import Flask
from mongoengine import connect
from routes.api import api_bp 

app = Flask(__name__)

connect(
    db='iContentPro',
    host='mongodb+srv://priteshhesta:xp7vccnYJWYqgPly@cluster0.kajp98n.mongodb.net',
    alias='default'
)

app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)
