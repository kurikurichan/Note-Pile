"""empty message

Revision ID: ffa05342d273
Revises: 57045566d64b
Create Date: 2022-08-08 22:30:24.663659

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffa05342d273'
down_revision = '57045566d64b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notebooks', 'title',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notebooks', 'title',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)
    # ### end Alembic commands ###
