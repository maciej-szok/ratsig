from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Date, UniqueConstraint
from sqlalchemy.orm import relationship

from app.db.base_class import Base
from app.models.entry_tag import entry_tag_association_table

if TYPE_CHECKING:
    from .user import User  # noqa: F401


# TODO owner_id + date should be unique together
# TODO on delete

class Entry(Base):
    __tablename__ = "entry"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    date = Column(Date, index=True, nullable=False)

    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="entries")

    tags = relationship('Tag', secondary=entry_tag_association_table, back_populates="entries")

    __table_args__ = (UniqueConstraint('owner_id', 'date', name='_owner_date_uc'), )
