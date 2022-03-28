import json
from pydantic import BaseModel
from fastapi import APIRouter
from .worker import celery

router = APIRouter()

class Body(BaseModel):
    weight: float
    height: float


@router.post('/add')
async def calculate_bmi(body: Body):
    task_name = "tasks.add"
    task = celery.send_task(task_name, args=[body.weight, body.height])
    rt = dict(id=task.id, url='localhost:5000/check_task/{}'.format(task.id))
    return rt

@router.post('/bmi')
async def calculate_bmi(body: Body):
    task_name = "tasks.calc_bmi"
    task = celery.send_task(task_name, args=[body.weight, body.height])
    rt = dict(id=task.id, url='localhost:5000/check_task/{}'.format(task.id))
    return rt

@router.get('/bmi/{task_id}')
def check_status(task_id: str):
    task = celery.AsyncResult(id)
    if task.state == 'SUCCESS':
        response = {
            'status': task.state,
            'result': task.result,
            'task_id': id
        }
    elif task.state == 'FAILURE':
        response = json.loads(task.backend.get(task.backend.get_key_for_task(task.id)).decode('utf-8'))
        del response['children']
        del response['traceback']
    else:
        response = {
            'status': task.state,
            'result': task.info,
            'task_id': id
        }
    return response

class Item(BaseModel):
    name: str
@router.post("/task_hello_world/")
async def create_item(item: Item):
    task_name = "hello.task"
    task = celery.send_task(task_name, args=[item.name])
    return dict(id=task.id, url='http://localhost:5000/check_task/{}'.format(task.id))


@router.get("/check_task/{id}")
def check_task(id: str):
    task = celery.AsyncResult(id)
    if task.state == 'SUCCESS':
        response = {
            'status': task.state,
            'result': task.result,
            'task_id': id
        }
    elif task.state == 'FAILURE':
        response = json.loads(task.backend.get(task.backend.get_key_for_task(task.id)).decode('utf-8'))
        del response['children']
        del response['traceback']
    else:
        response = {
            'status': task.state,
            'result': task.info,
            'task_id': id
        }
    return response
