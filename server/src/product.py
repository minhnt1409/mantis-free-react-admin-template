from flask import Flask, jsonify, request, send_file
from database import db, Product, User
from flask import Blueprint
from celery import chord
from app1.tasks import add, deleteProduct, save_task_id
from util import verify_token
import jwt
import io
import base64

product = Blueprint("product", __name__)

@product.route('/products', methods=['GET'])
@verify_token
def get_products():
    products = Product.query.all()
    result = []
    for product in products:
        if(product.state == 'ready'):
            result.append({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'quantity': product.quantity,
                'soldQuantity': product.soldQuantity
            })
        print(product.task_id)
    return jsonify(result)

@product.route('/product/<id>', methods=['GET'])
@verify_token
def get_a_product(id):
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
@verify_token
def add_product():
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
    product = Product(name=name, description=description, price=price, quantity=quantity)
    product.images = encoded_image
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product add successfully!'})

@product.route('/product/update/<id>', methods=['PUT'])
@verify_token
def update_product(id):
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

@product.route('/product/<id>', methods=['DELETE'])
@verify_token
def delete_product(id):
    delete_product_task = deleteProduct.si(id)
    save_task_id_task = save_task_id.si(id, delete_product_task.id)
    chain = delete_product_task | save_task_id_task
    chain.delay()
    return jsonify({'message': 'Product deleted successfully!'})
        
@product.route('/test', methods=['GET'])
def test():
    print('abc')
    result = add.apply_async(args=(4, 4),timeout=10)
    task_result = result.ready()  # Lấy kết quả từ công việc Celery
    print(task_result)
    return jsonify(task_result)