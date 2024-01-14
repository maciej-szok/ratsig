from typing import List

import sqlalchemy.exc
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.entry_tag import EntryTag
from app.models.tag import Tag
from app.schemas.entry_tag import EntryTagCreate, EntryTagUpdate


class MissingDatabaseObject(Exception):
    pass


class CRUDEntry(CRUDBase[EntryTag, EntryTagCreate, EntryTagUpdate]):
    def add_tags_to_entry(self, db: Session, *, entry_id: int, tag_ids: list[int]) -> list[EntryTag]:
        instances = []
        try:
            for tag_id in tag_ids:
                db_obj = self.model(entry_id=entry_id, tag_id=tag_id)
                instances.append(db_obj)

            db.add_all(instances)
            db.commit()
        except sqlalchemy.exc.IntegrityError as e:
            db.rollback()
            raise MissingDatabaseObject(e)
        return instances

    def get_tags_by_entry(self, db: Session, *, entry_id: int) -> list[Tag]:
        return (
            db.query(EntryTag, Tag).select_from(Tag)
            .join(Tag, EntryTag.tag_id == Tag.id)
            .filter(EntryTag.entry_id == entry_id)
            .all()
        )

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[EntryTag]:
        return (
            db.query(self.model)
            .filter(EntryTag.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


entry_tag = CRUDEntry(EntryTag)
