from celery import Celery

# from celeryconfig import broker_url, result_backend

# app = Celery('mantis', broker_url, result_backend)
app = Celery('mantis',include=["app1.tasks"])

app.config_from_object('celeryconfig')

# celery -A my_celery worker --loglevel=info
