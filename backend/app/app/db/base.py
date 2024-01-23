# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.item import Item  # noqa
from app.models.user import User  # noqa
from app.models.tag import Tag  # noqa
from app.models.entry import Entry  # noqa
from app.models.entry_tag import association_table
