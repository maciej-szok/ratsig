from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class EntryTag(Base):
    id = Column(Integer, primary_key=True, index=True)

    entry_id = Column(Integer, ForeignKey("entry.id"))
    entry = relationship("Entry", back_populates="entry_tag")
    tag_id = Column(Integer, ForeignKey("tag.id"))
    tag = relationship("Tag", back_populates="entry_tag")

