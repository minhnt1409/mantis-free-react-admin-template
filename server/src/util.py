from functools import wraps
from flask import request, jsonify
from database import User
import jwt

JWT_SECRET='20200409'

# Decorator xác minh mã thông báo
def verify_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization').split()[1]
        try:
            decoded_token = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            id = decoded_token['id']
            if User.query.filter_by(id=id).first():
                return f(*args, **kwargs)
            else:
                raise jwt.InvalidTokenError
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401
    return decorated_function