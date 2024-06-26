import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.tag import TagBase, TagInDBBase, TagPublic


# Shared properties
class EntryBase(BaseModel):
    content: Optional[str] = None


# Properties to receive on item creation
class EntryCreate(EntryBase):
    content: str
    date: datetime.date | None


# Properties to receive on item update
class EntryUpdate(EntryBase):
    tags: Optional[list[int]] = None


# Properties shared by models stored in DB
class EntryInDBBase(EntryBase):
    id: int
    content: str
    owner_id: int
    tags: list[TagInDBBase]
    date: datetime.date

    class Config:
        orm_mode = True


# Properties to return to client
class EntryPublic(EntryBase):
    id: int
    content: str
    tags: list[TagPublic]
    date: datetime.date | None

    class Config:
        orm_mode = True
