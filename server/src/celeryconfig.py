broker_url = 'amqp://guest:guest@localhost:5672//'  # URL kết nối tới broker (RabbitMQ)

result_backend = 'db+sqlite:///results.sqlite'  # Backend lưu trữ kết quả (SQLite)

task_queues = {
    'default': {
        'exchange': 'default',
        'exchange_type': 'direct',
        'binding_key': 'default'
    },
    'high_priority': {
        'exchange': 'high_priority',
        'exchange_type': 'direct',
        'binding_key': 'high_priority'
    },
}

task_routes = {
    'app1.tasks.*': {'queue': 'default'},
    'app1.tasks.high_priority_task': {'queue': 'high_priority'},
}

worker_concurrency = 4  # Số lượng worker

