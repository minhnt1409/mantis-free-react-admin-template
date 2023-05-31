from flask import Flask, jsonify, request, send_file
from database import db, User
from flask import Blueprint
import jwt

user = Blueprint("user", __name__)
secret_key="20200409"

@user.route('/register', methods=['POST'])
def register():
    # Lấy thông tin từ request
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')
    name = firstname + ' ' + lastname
    email = request.json.get('email')
    password = request.json.get('password')
    company = request.json.get('company')

    user = User.query.filter_by(email=email).first()
    # Kiểm tra xem email đã được đăng ký trước đó hay chưa
    if user:
        return jsonify({'error': 'Email already registered'}), 400
    
    # Lưu thông tin người dùng vào dictionary
    user = User(name=name,email=email,password=password,company=company)
    db.session.add(user)
    db.session.commit()

    # Trả về một token để sử dụng cho các yêu cầu tiếp theo
    return jsonify({'message': 'User add successfully!'}), 200

@user.route('/login', methods=['POST'])
def Login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    print('user: ',user)
    if user and password == user.password:
        token = jwt.encode({'id':user.id ,'email': email}, secret_key, algorithm='HS256')
        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401
    
@user.route('/logout', methods=['POST'])
def Logout():
    token = request.headers.get('Authorization').split()[1]
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        id = decoded_token['id']
        if User.query.filter_by(id=id).first():
            return jsonify({"message": "Logout successful"}), 200
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401
    
# @user.route('/logout', methods=['POST'])
# def logout():
#     # Kiểm tra xem token có hợp lệ hay không
#     # Nếu đúng, đăng xuất người dùng và trả về một thông báo thành công
#     # Nếu sai, trả về một thông báo lỗi
#     token = request.headers.get('Authorization')
#     print()
#     if token == 'some_token':
#         # Đăng xuất người dùng ở đây
#         return jsonify({'message': 'Logout successful'}), 200
#     else:
#         return jsonify({'error': 'Invalid token'}), 401