from pprint import pprint
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.models import Tag

router = APIRouter()


@router.get("/", response_model=list[schemas.Entry])
def read_entries(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve entries.
    """
    if crud.user.is_superuser(current_user):
        entries = crud.entry.get_multi(db, skip=skip, limit=limit)
    else:
        entries = crud.entry.get_multi_by_owner(
            db=db, owner_id=current_user.id, skip=skip, limit=limit
        )

    return entries


@router.post("/", response_model=schemas.Entry)
def create_entry(
    *,
    db: Session = Depends(deps.get_db),
    item_in: schemas.EntryCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new entry.
    """
    tag = crud.entry.create_with_owner(db=db, obj_in=item_in, owner_id=current_user.id)
    return tag


@router.put("/{id}", response_model=None)
def update_entry(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    entry_in: schemas.EntryUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an entry.
    """
    entry = crud.entry.get(db=db, id=id)
    if not entry:
        raise HTTPException(status_code=404, detail="Tag not found")
    if not crud.user.is_superuser(current_user) and (entry.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    entry = crud.entry.update(db=db, db_obj=entry, obj_in=entry_in)

    # add the tags to the entry
    for tag_id in entry_in.tags:
        tag = crud.tag.get(db=db, id=tag_id)
        entry.tags.append(tag)
    db.commit()
    return entry


@router.get("/{id}", response_model=schemas.Entry)
def read_entry(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get entry by ID.
    """
    item = crud.entry.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not crud.user.is_superuser(current_user) and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return item