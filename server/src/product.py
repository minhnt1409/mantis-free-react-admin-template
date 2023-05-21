from flask import Flask, jsonify, request, send_file
from database import db, Product, User
from flask import Blueprint
import jwt
import io
import base64

product = Blueprint("product", __name__)
secret_key="20200409"

@product.route('/products', methods=['GET'])
def get_products():
    token = request.headers.get('Authorization').split()[1]
    print(token)
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        id = decoded_token['id']
        if User.query.filter_by(id=id).first():
            products = Product.query.all()
            result = []
            for product in products:
                result.append({
                    'id': product.id,
                    'name': product.name,
                    'description': product.description,
                    'price': product.price,
                    'quantity': product.quantity,
                    'soldQuantity': product.soldQuantity
                })
            return jsonify(result)
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

@product.route('/product/<id>', methods=['GET'])
def get_a_product(id):
    token = request.headers.get('Authorization').split()[1]
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        _id = decoded_token['id']
        if User.query.filter_by(id=_id).first():
            product = Product.query.filter_by(id=id).first()
            result = {
                    'id': product.id,
                    'name': product.name,
                    'description': product.description,
                    'price': product.price,
                    'quantity': product.quantity,
                    'soldQuantity': product.soldQuantity
                }
            return jsonify(result)
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401
        
@product.route('/upload_image/<id>', methods=['GET'])
def upload_image(id):
    product = Product.query.get(id)
    if product is None or product.images is None:
        return 'Product not found', 404
    # Giải mã ảnh từ base64
    image_bytes = base64.b64decode(product.images)
    # Tạo file object từ bytes data
    image_file = io.BytesIO(image_bytes)
    # Trả về ảnh dưới dạng file object
    return send_file(image_file, mimetype='image/jpeg')

@product.route('/add_product', methods=['POST'])
def add_product():
    token = request.headers.get('Authorization').split()[1]
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        _id = decoded_token['id']
        if User.query.filter_by(id=_id).first():
            # Lấy dữ liệu từ request
            name = request.form.get('name')
            description = request.form.get('description')
            price = request.form.get('price')
            quantity = request.form.get('quantity')
            image_file = request.files.get('image')
            if name == None or price == None or quantity == None:
                return jsonify({'message': 'Parameter is not enough!'}), 400
            encoded_image = None
            if image_file != None:
                encoded_image = base64.b64encode(image_file.read())
            product = Product(name=name, description=description, images=encoded_image, price=price, quantity=quantity)
            db.session.add(product)
            db.session.commit()
            return jsonify({'message': 'Product add successfully!'})
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

@product.route('/product/update/<id>', methods=['PUT'])
def update_product(id):
    token = request.headers.get('Authorization').split()[1]
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        _id = decoded_token['id']
        if User.query.filter_by(id=_id).first():
            # Lấy sản phẩm từ database
            product = Product.query.filter_by(id=id).first()
            # Lấy dữ liệu từ request
            name = request.form.get('name')
            description = request.form.get('description')
            price = request.form.get('price')
            quantity = request.form.get('quantity')
            image_file = request.files.get('image')
            if image_file:
                encoded_image = base64.b64encode(image_file.read())
                product.images = encoded_image
            # Cập nhật thông tin sản phẩm
            product.name = name or product.name
            product.description = description or product.description
            product.price = price or product.price
            product.quantity = quantity or product.quantity
            db.session.merge(product)
            db.session.commit()
            return jsonify({'message': 'Product updated successfully!'})
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

@product.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    token = request.headers.get('Authorization').split()[1]
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        _id = decoded_token['id']
        if User.query.filter_by(id=_id).first():
            product = Product.query.filter_by(id=id).first()
            db.session.delete(product)
            db.session.commit()
            return jsonify({'message': 'Product deleted successfully!'})
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401