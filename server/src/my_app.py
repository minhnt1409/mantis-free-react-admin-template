from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from database import db , User, Product
from product import product
from user import user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
migrate = Migrate(app, db)
db.init_app(app)
CORS(app)
app.register_blueprint(product)
app.register_blueprint(user)

# chỉ tạo 1 lần
# with app.app_context():
    # db.create_all()
    # product = Product(name='TV', description='Màn hình cong', price=10000, quantity=100)
    # db.session.add(product)
    # product = Product(name='Laptop', description='Mỏng nhẹ', price=20000, quantity=100)
    # db.session.add(product)
    # product = Product(name='Chuột gaming', description='Độ nhạy cao', price=100, quantity=100)
    # db.session.add(product)
    # product = Product(name='Màn hình RGB', description='Hiển thị đc 16 tỉ màu', price=15000, quantity=100)
    # db.session.add(product)
    # product = Product(name='Tai nghe gaming', description='Âm thanh 8D', price=250, quantity=100)
    # db.session.add(product)
    # product = Product(name='Điều hòa', description='Tiết kiệm điện', price=2500, quantity=100)
    # db.session.add(product)
    # product = Product(name='Quạt điện', description='Hiện năng cao', price=180, quantity=100)
    # db.session.add(product)
    # product = Product(name='Tủ lạnh', description='Làm đá nhanh', price=1000, quantity=100)
    # db.session.add(product)
    # product = Product(name='Nóng lạnh', description='Làm nóng nhanh', price=3000, quantity=100)
    # db.session.add(product)
    # user = User(name='user1', email='user1@gmail.com', password='1', company='FPT')
    # db.session.add(user)
    # db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
