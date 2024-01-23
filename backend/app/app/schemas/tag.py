import typing

from pydantic import BaseModel
from typing import Optional

from app.models.tag import TagType


# Shared properties
class TagBase(BaseModel):
    type: TagType
    text: str | None


# Properties to receive on item creation
class TagCreate(TagBase):
    text: str
    type: TagType


# Properties to receive on item update
class TagUpdate(TagBase):
    pass


# Properties shared by models stored in DB
class TagInDBBase(TagBase):
    id: int
    type: TagType
    text: str
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class TagPublic(TagBase):
    id: int
    type: TagType
    text: str

    class Config:
        orm_mode = True
