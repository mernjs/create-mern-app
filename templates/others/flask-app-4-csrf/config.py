import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_default_secret_key')
    
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'uploads/')
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
    
    MONGO_URI = os.environ.get('MONGO_URI', '')
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')
    JWT_TOKEN_LOCATION = ['headers', 'cookies']   
    JWT_COOKIE_CSRF_PROTECT = True     
    JWT_CSRF_IN_COOKIES = True        

    MAIL_SERVER = 'sandbox.smtp.mailtrap.io'
    MAIL_PORT = 2525
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', '7aec227dbc4276')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'fd572ab4da585d')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'vijay.hestabit@gmail.com')