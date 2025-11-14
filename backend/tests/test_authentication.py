import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.models import Base
from app.services.auth_service import authenticate_user, hash_password
from app.models.user import User

TEST_DB_URL = "postgresql://test:test@localhost:5433/test_db"
engine = create_engine(TEST_DB_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    
    session.execute(text("TRUNCATE TABLE users RESTART IDENTITY CASCADE"))
    session.commit()
    
    yield session
    
    session.close()
    Base.metadata.drop_all(bind=engine)
    
@pytest.mark.auth
def test_authenticate_valid_user(db):
    user = User(email="teste@email.com", hashed_password=hash_password("123456"))
    db.add(user)
    db.commit()
    
    result = authenticate_user(db, "teste@email.com", "123456")
    assert result is not None, "Usuário válido não foi autenticado!"

@pytest.mark.auth
def test_authenticate_invalid_user(db):
    result = authenticate_user(db, "invalido@email.com", "123456")
    assert result is None, "Usuário inválido foi autenticado!"

@pytest.mark.auth
def test_authenticate_wrong_password(db):
    user = User(email="teste@email.com", hashed_password=hash_password("123456"))
    db.add(user)
    db.commit()

    result = authenticate_user(db, "teste@email.com", "wrongpassword")
    assert result is None, "Usuário com senha errada foi autenticado!"
