from celery import shared_task
from database import db, Product

@shared_task
def add(x, y):
    return x + y

@shared_task
def deleteProduct(id):
    import sys
    sys.path.insert(0, '../src')
    from my_app import app
    with app.app_context():
        product = Product.query.filter_by(id=id).first()
        product.state = 'deleted'
        db.session.commit()
    return True
    
@shared_task
def save_task_id(id, taskId):
    import sys
    sys.path.insert(0, '../src')
    from my_app import app
    with app.app_context():
        product = Product.query.filter_by(id=id).first()
        product.task_id = taskId
        db.session.commit()
    return True