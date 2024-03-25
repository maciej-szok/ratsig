import datetime
from pprint import pprint
from typing import Any, List

import sqlalchemy.exc
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=list[schemas.EntryPublic])
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


@router.post("/{date}", response_model=schemas.EntryPublic)
def create_entry(
    *,
    db: Session = Depends(deps.get_db),
    date: str,
    entry_in: schemas.EntryCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new entry.
    """
    try:
        entry_in.date = datetime.date(*[int(x) for x in date.split("-")])
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")
    try:
        entry = crud.entry.create_with_owner(db=db, obj_in=entry_in, owner_id=current_user.id)
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(status_code=400, detail="Entry already exists")

    return entry


@router.put("/{date}", response_model=schemas.EntryPublic)
def update_entry(
    *,
    db: Session = Depends(deps.get_db),
    date: str,
    entry_in: schemas.EntryUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an entry.
    """
    try:
        date = datetime.date(*[int(x) for x in date.split("-")])
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    entry = crud.entry.get(db=db, date=date)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    if not crud.user.is_superuser(current_user) and (entry.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    entry = crud.entry.update(db=db, db_obj=entry, obj_in=entry_in)

    # add the tags to the entry
    if entry_in.tags is not None:
        new_tags = []
        for tag_id in entry_in.tags:
            tag = crud.tag.get(db=db, id=tag_id)
            new_tags.append(tag)
        entry.tags = new_tags
    db.commit()

    # refetch entry to get the updated tags
    entry = crud.entry.get(db=db, date=date)
    return entry


@router.get("/{date}", response_model=schemas.EntryPublic)
def read_entry(
    *,
    db: Session = Depends(deps.get_db),
    date: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get entry by ID.
    """
    try:
        date = datetime.date(*[int(x) for x in date.split("-")])
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")


    item = crud.entry.get(db=db, date=date)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not crud.user.is_superuser(current_user) and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return item
