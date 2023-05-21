from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    soldQuantity = db.Column(db.Integer, default=0)
    images = db.Column(db.LargeBinary)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())

    def __init__(self, name, description, images , price, quantity):
        self.name = name
        self.description = description
        self.images = images
        self.price = price
        self.quantity = quantity

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=True)
    
    def __init__(self, name, email, password , company):
        self.name = name
        self.email = email
        self.password = password
        self.company = company