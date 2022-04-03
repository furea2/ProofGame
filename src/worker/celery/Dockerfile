FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app/
COPY ./requirements.txt /app/requirements.txt
RUN pip install pip --upgrade && pip install -r requirements.txt

COPY ./src /app

# ENTRYPOINT celery -A tasks worker --loglevel=info