import os
import time
from celery import Celery

# @celery.task(name='tasks.calc_bmi')
# def calc_bmi(weight: float, height: float) -> float:
#     time.sleep(10)
#     bmi = weight / height**2
#     return bmi


CELERY_BROKER_URL = os.getenv("REDISSERVER", "amqp://guest:guest@rabbitmq:5672/0")
CELERY_BACKEND_URL = os.getenv("REDISSERVER", "redis://redis:6379/0")

celery = Celery("celery", backend=CELERY_BROKER_URL, broker=CELERY_BACKEND_URL)
# celery.conf.update(result_expires=3600)
