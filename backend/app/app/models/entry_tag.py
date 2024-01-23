from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, Table

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401

association_table = Table(
    "association_table",
    Base.metadata,
    Column("entry_id", ForeignKey("entry.id"), primary_key=True),
    Column("tag_id", ForeignKey("tag.id"), primary_key=True),
)
