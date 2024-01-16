"""add enter and entry tags

Revision ID: 8720131dd8e8
Revises: c9fc5aecd081
Create Date: 2024-01-14 21:02:03.994883

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '8720131dd8e8'
down_revision = 'c9fc5aecd081'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_entries_id'), 'entries', ['id'], unique=False)
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Enum('place', 'person', 'activity', 'other', name='tagtype'), nullable=True),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tags_id'), 'tags', ['id'], unique=False)
    op.drop_index('ix_entry_id', table_name='entry')
    op.drop_table('entry')
    op.drop_index('ix_tag_id', table_name='tag')
    op.drop_table('tag')
    op.drop_constraint('entrytag_tag_id_fkey', 'entrytag', type_='foreignkey')
    op.drop_constraint('entrytag_entry_id_fkey', 'entrytag', type_='foreignkey')
    op.create_foreign_key(None, 'entrytag', 'tags', ['tag_id'], ['id'])
    op.create_foreign_key(None, 'entrytag', 'entries', ['entry_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'entrytag', type_='foreignkey')
    op.drop_constraint(None, 'entrytag', type_='foreignkey')
    op.create_foreign_key('entrytag_entry_id_fkey', 'entrytag', 'entry', ['entry_id'], ['id'])
    op.create_foreign_key('entrytag_tag_id_fkey', 'entrytag', 'tag', ['tag_id'], ['id'])
    op.create_table('tag',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('text', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('owner_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('type', postgresql.ENUM('place', 'person', 'activity', 'other', name='tagtype'), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], name='tag_owner_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='tag_pkey')
    )
    op.create_index('ix_tag_id', 'tag', ['id'], unique=False)
    op.create_table('entry',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('owner_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], name='entry_owner_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='entry_pkey')
    )
    op.create_index('ix_entry_id', 'entry', ['id'], unique=False)
    op.drop_index(op.f('ix_tags_id'), table_name='tags')
    op.drop_table('tags')
    op.drop_index(op.f('ix_entries_id'), table_name='entries')
    op.drop_table('entries')
    # ### end Alembic commands ###
