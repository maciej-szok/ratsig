from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum


class TagType(enum.Enum):
    place = "place"
    person = "person"
    activity = "activity"
    other = "other"


if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Tag(Base):
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(TagType))
    text = Column(String)

    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="tags")

    entry_tag = relationship("EntryTag", secondary="entry_tags", back_populates="tag")
