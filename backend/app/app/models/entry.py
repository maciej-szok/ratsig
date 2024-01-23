from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base
from app.models.entry_tag import association_table

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Entry(Base):
    __tablename__ = "entry"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="entries")

    tags = relationship('Tag', secondary=association_table, back_populates="entries")
