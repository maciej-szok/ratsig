"""Date as an index in entry, composite key for entry

Revision ID: 721f38665916
Revises: 7a8a0ddd3909
Create Date: 2024-01-29 21:11:10.626202

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '721f38665916'
down_revision = '7a8a0ddd3909'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('entry', 'date',
               existing_type=sa.DATE(),
               nullable=False)
    op.create_index(op.f('ix_entry_date'), 'entry', ['date'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_entry_date'), table_name='entry')
    op.alter_column('entry', 'date',
               existing_type=sa.DATE(),
               nullable=True)
    # ### end Alembic commands ###
