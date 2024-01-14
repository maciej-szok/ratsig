from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum


class TagType(enum.Enum):
    place = 1
    person = 2
    activity = 3
    other = 4

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Item(Base):
    id = Column(Integer, primary_key=True, index=True)
    type = Column('value', Enum(TagType))
    name = Column(String)

    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="items")
