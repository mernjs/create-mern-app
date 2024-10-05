from flask_jwt_extended import create_access_token, get_csrf_token, get_jwt_identity
from botocore.exceptions import NoCredentialsError
from flask import current_app, jsonify
import boto3

def api_response(message, status_code=200, data=None):
    """
    Returns a JSON response with a message, status code, and optional data.
    
    :param message: The message to include in the response.
    :param status_code: The HTTP status code (default is 200).
    :param data: Optional data to include in the response (default is None).
    :return: A JSON response.
    """
    response = {
        'msg': message,
    }
    
    if data is not None:
        response['data'] = data
    
    return jsonify(response), status_code

def generate_tokens(user):
    try:
        access_token = create_access_token(identity=user)
        csrf_token = get_csrf_token(access_token)
        return access_token, csrf_token
    except Exception as e:
        print(f"Error generating tokens: {e}")
        return None, None

def get_current_user():
    try:
        current_user = get_jwt_identity()
        return current_user
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": "An error occurred while retrieving user identity"}), 500
    
def upload_to_s3(file, s3_file_name):
    try:
        region_name = current_app.config['AWS_REGION']
        bucket_name = current_app.config['S3_BUCKET_NAME']
        s3 = boto3.client(
            's3',
            aws_access_key_id=current_app.config['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=current_app.config['AWS_SECRET_ACCESS_KEY'],
            region_name=region_name
        )
        s3.upload_fileobj(file, bucket_name, s3_file_name, ExtraArgs={'ACL': 'public-read'})
        file_url = f"https://s3.{region_name}.amazonaws.com/{bucket_name}/{s3_file_name}"
        return file_url
    except NoCredentialsError:
        print("Credentials not available")
        return None
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return None