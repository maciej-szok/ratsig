"""rename entry_tag association_table

Revision ID: d29120518d0b
Revises: b83c7feb11a8
Create Date: 2024-01-24 00:45:36.047680

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd29120518d0b'
down_revision = 'b83c7feb11a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('entry_tag',
    sa.Column('entry_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['entry_id'], ['entry.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('entry_id', 'tag_id')
    )
    op.drop_table('association_table')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('association_table',
    sa.Column('entry_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('tag_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['entry_id'], ['entry.id'], name='association_table_entry_id_fkey'),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], name='association_table_tag_id_fkey'),
    sa.PrimaryKeyConstraint('entry_id', 'tag_id', name='association_table_pkey')
    )
    op.drop_table('entry_tag')
    # ### end Alembic commands ###
