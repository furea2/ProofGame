import os
from celery import Celery

CELERY_BROKER_URL = os.getenv("REDISSERVER", "redis://redis:6379/0")
CELERY_RESULT_BACKEND = os.getenv("REDISSERVER", "redis://redis:6379/1")

celery = Celery("celery", backend=CELERY_BROKER_URL, broker=CELERY_RESULT_BACKEND)
# celery.conf.update(result_expires=3600)


# os.environ.setdefault('CELERY_CONFIG_MODULE', 'celery_config')

# celery = Celery('celery')
# celery.config_from_envvar('CELERY_CONFIG_MODULE')
