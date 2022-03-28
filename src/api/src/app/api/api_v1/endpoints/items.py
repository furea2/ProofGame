from typing import Any, List, Dict

from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
# from sqlalchemy.orm import Session

# from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.post("/",)
def sample_api(item:Dict):
    json_obj = jsonable_encoder(item)
    result = {"status":"ok","data":json_obj}
    return result



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