"""descripcion agregada a archivo

Revision ID: 5268c78b09d7
Revises: 219d404ab85a
Create Date: 2025-02-22 04:20:36.359581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5268c78b09d7'
down_revision = '219d404ab85a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('archivo', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descripcion', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('archivo', schema=None) as batch_op:
        batch_op.drop_column('descripcion')

    # ### end Alembic commands ###
