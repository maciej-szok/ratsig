from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum

from .entry_tag import entry_tag_association_table


class TagType(enum.Enum):
    place = "place"
    person = "person"
    activity = "activity"
    other = "other"


if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Tag(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(TagType))
    text = Column(String)

    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="tags")

    entries = relationship('Entry', secondary=entry_tag_association_table, back_populates="tags")
