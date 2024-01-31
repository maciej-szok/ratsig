"""owner id and date must be unique

Revision ID: 231232f747bc
Revises: ea38514a730d
Create Date: 2024-01-29 21:23:54.446787

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '231232f747bc'
down_revision = 'ea38514a730d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('_owner_date_uc', 'entry', ['owner_id', 'date'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('_owner_date_uc', 'entry', type_='unique')
    # ### end Alembic commands ###
