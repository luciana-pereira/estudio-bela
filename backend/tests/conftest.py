import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

from app.main import app
from app.models import Base
from app.config import get_db
from app.services.user_service import create_user
from app.schemas import UserCreate

# ==========================
# 1. Criação automática do .env.test
# ==========================

TEST_ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env.test")

if not os.path.exists(TEST_ENV_PATH):
    with open(TEST_ENV_PATH, "w") as f:
        f.write("TEST_DATABASE_URL=postgresql://test:test@localhost:5433/test_db\n")
    print("[AUTO] Arquivo .env.test criado automaticamente.")


# ==========================
# 2. Lê o banco de teste do .env.test
# ==========================

load_dotenv(TEST_ENV_PATH)

TEST_DATABASE_URL = os.getenv("TEST_DATABASE_URL")

if not TEST_DATABASE_URL:
    raise RuntimeError("ERRO: TEST_DATABASE_URL não foi encontrado no .env.test")


# ==========================
# 3. Configura o engine PostgreSQL
# ==========================

engine = create_engine(TEST_DATABASE_URL, echo=False)


TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ==========================
# 4. Override automático do get_db
# ==========================

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db


# ==========================
# 5. Criar e resetar tabelas antes da suíte de testes
# ==========================

@pytest.fixture
def db():
    """Fixture que fornece uma sessão do banco de dados para os testes."""
    Base.metadata.create_all(bind=engine)  
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

# ==========================
# 6. Cliente da API
# ==========================

@pytest.fixture
def client():
    return TestClient(app)
