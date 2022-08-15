"""empty message

Revision ID: 62488f578adf
Revises: 65c5571de97c
Create Date: 2022-08-13 12:43:09.407751

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '62488f578adf'
down_revision = '65c5571de97c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notebooks', sa.Column('title', sa.String(length=60), nullable=False))
    op.add_column('pages', sa.Column('title', sa.String(length=60), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('pages', 'title')
    op.drop_column('notebooks', 'title')
    # ### end Alembic commands ###