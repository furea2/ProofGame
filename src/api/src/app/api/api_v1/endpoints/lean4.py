import json
from pydantic import BaseModel
from typing import Any, List, Dict

from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
# from sqlalchemy.orm import Session
from .worker import celery

# from app import crud, models, schemas
from app.api import deps

router = APIRouter()

# @router.post("/",)
# def sample_api(item:Dict):
#     json_obj = jsonable_encoder(item)
#     print(json_obj)
#     progress = 10
#     detail = """./src/sample.lean:8:4: warning :declaration uses 'sorry'
# ./src/sample.lean:9:4: error: no goals to be solved"""
#     result = {"progress":progress,"detail":detail}

#     rt = {"status":"ok","result":result}
#     return rt


class Item(BaseModel):
    code: str
@router.post("/get_result/")
async def create_item(item: Item):
    print(item.code)
    task_name = "hello.task"
    task = celery.send_task(task_name, args=[item.code])
    task_info = dict(id=task.id, url=f'http://localhost:38000/api/v1/lean4/check_task/{task.id}')

    progress = 10
    detail = """./src/sample.lean:8:4: warning :declaration uses 'sorry'
./src/sample.lean:9:4: error: no goals to be solved"""
    result = {"progress":progress,"detail":detail}

    rt = {"status":"ok","result":result,"task_info":task_info}
    return rt

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


# @router.get("/", response_model=List[schemas.Item])
# def read_items(
#     db: Session = Depends(deps.get_db),
#     skip: int = 0,
#     limit: int = 100,
#     current_user: models.User = Depends(deps.get_current_active_user),
# ) -> Any:
#     """
#     Retrieve items.
#     """
#     if crud.user.is_superuser(current_user):
#         items = crud.item.get_multi(db, skip=skip, limit=limit)
#     else:
#         items = crud.item.get_multi_by_owner(
#             db=db, owner_id=current_user.id, skip=skip, limit=limit
#         )
#     return items