from typing import Optional

from pydantic import BaseModel


# Shared properties
class EntryTagBase(BaseModel):
    entry_id: int
    tag_id: int


# Properties to receive on item creation
class EntryTagCreate(EntryTagBase):
    entry_id: int
    tag_id: int


# Properties to receive on item update
class EntryTagUpdate(EntryTagBase):
    pass


# Properties shared by models stored in DB
class EntryTagInDBBase(EntryTagBase):
    id: int
    entry_id: int
    tag_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class EntryTag(EntryTagInDBBase):
    pass


# Properties properties stored in DB
class EntryTagInDB(EntryTagInDBBase):
    pass
