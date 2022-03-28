from time import sleep
import traceback

from celery import current_task
from celery import states
from celery.exceptions import Ignore

from worker import celery


@celery.task(name='hello.task', bind=True)
def hello_world(self, name):
    try:
        if name == 'error':
            k = 1 / 0
        for i in range(60):
            sleep(1)
            self.update_state(state='PROGRESS', meta={'done': i, 'total': 60})
        return {"result": "hello {}".format(str(name))}
    except Exception as ex:
        self.update_state(
            state=states.FAILURE,
            meta={
                'exc_type': type(ex).__name__,
                'exc_message': traceback.format_exc().split('\n')
            })
        raise ex

@celery.task(name='tasks.calc_bmi')
def calc_bmi(weight: float, height: float) -> float:
    sleep(3)
    bmi = weight / height**2
    return bmi

@celery.task(name='tasks.add')
def add(x, y):
    return x + y
