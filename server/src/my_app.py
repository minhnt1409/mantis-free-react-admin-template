from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from database import db , User, Product
from product import product
from user import user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
app.register_blueprint(product)
app.register_blueprint(user)

if __name__ == '__main__':
    app.run(debug=True)
