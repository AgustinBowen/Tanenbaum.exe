"""Agregar campo data en Archivo

Revision ID: ed4fada308c2
Revises: 5260af6aa8e1
Create Date: 2025-02-19 08:24:17.241044

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed4fada308c2'
down_revision = '5260af6aa8e1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('archivo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('examen_id', sa.Integer(), nullable=False),
    sa.Column('filename', sa.String(length=255), nullable=False),
    sa.Column('tipo', sa.String(length=10), nullable=False),
    sa.Column('data', sa.LargeBinary(), nullable=False),
    sa.ForeignKeyConstraint(['examen_id'], ['examen.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('examen', schema=None) as batch_op:
        batch_op.drop_column('file_url')
        batch_op.drop_column('filename')
        batch_op.drop_column('tipo')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('examen', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tipo', sa.VARCHAR(length=10), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('filename', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('file_url', sa.VARCHAR(length=255), autoincrement=False, nullable=False))

    op.drop_table('archivo')
    # ### end Alembic commands ###
