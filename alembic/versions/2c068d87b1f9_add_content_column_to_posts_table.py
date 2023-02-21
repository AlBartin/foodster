"""add content column to posts table

Revision ID: 2c068d87b1f9
Revises: ca40fe73c590
Create Date: 2023-01-27 12:20:57.670332

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c068d87b1f9'
down_revision = 'ca40fe73c590'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('posts', sa.Column('content', sa.String(), nullable=False))
    pass


def downgrade() -> None:
    op.drop_column('posts', 'content')
    pass
