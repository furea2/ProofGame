import os
from celery import Celery

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
CELERY_BACKEND_URL = os.getenv("CELERY_BACKEND_URL")

celery = Celery("celery", broker=CELERY_BROKER_URL, backend=CELERY_BACKEND_URL)


