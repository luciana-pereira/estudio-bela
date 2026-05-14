import os
from logging.config import fileConfig
from sqlalchemy import create_engine, pool
from alembic import context
from dotenv import load_dotenv

# 1. Carrega as variáveis do arquivo .env
load_dotenv() 

# 2. IMPORTANTE: Importa o Base, o User e o Role lá da sua pasta models
# Isso faz o Alembic "acordar" e ver que as tabelas existem
from app.models import Base, User, Role

# 3. Define o alvo dos metadados (usando o Base que contém User e Role)
target_metadata = Base.metadata

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

def run_migrations_offline():
    url = os.getenv("DATABASE_URL")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    url = os.getenv("DATABASE_URL")
    if not url:
        raise ValueError("ERRO: DATABASE_URL não encontrada no .env")

    connectable = create_engine(url, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()