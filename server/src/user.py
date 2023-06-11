from flask import Flask, jsonify, request, send_file
from database import db, User
from util import verify_token
from flask import Blueprint
import jwt
import bcrypt

user = Blueprint("user", __name__)
JWT_SECRET='20200409'

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
    
    # Băm mật khẩu
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Lưu thông tin người dùng vào dictionary
    user = User(name=name,email=email,password=hashed_password,company=company)
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
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        token = jwt.encode({'id':user.id ,'email': email}, JWT_SECRET , algorithm='HS256')
        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401
    
@user.route('/logout', methods=['POST'])
@verify_token
def Logout():
    return jsonify({"message": "Logout successful"}), 200
