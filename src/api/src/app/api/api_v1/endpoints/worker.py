import os
import time
from celery import Celery

# @celery.task(name='tasks.calc_bmi')
# def calc_bmi(weight: float, height: float) -> float:
#     time.sleep(10)
#     bmi = weight / height**2
#     return bmi


CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
CELERY_BACKEND_URL = os.getenv("CELERY_BACKEND_URL")

celery = Celery("celery", broker=CELERY_BROKER_URL, backend=CELERY_BACKEND_URL)

