from typing import Optional

from pydantic import BaseModel

from app.schemas.tag import TagBase, TagInDBBase


# Shared properties
class EntryBase(BaseModel):
    content: Optional[str] = None


# Properties to receive on item creation
class EntryCreate(EntryBase):
    content: str


# Properties to receive on item update
class EntryUpdate(EntryBase):
    tags: Optional[list[int]] = None


# Properties shared by models stored in DB
class EntryInDBBase(EntryBase):
    id: int
    content: str
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Entry(EntryInDBBase):
    tags: list[TagInDBBase]


# Properties properties stored in DB
class EntryInDB(EntryInDBBase):
    pass
