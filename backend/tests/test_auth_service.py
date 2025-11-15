import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.models import Base
from app.models.user import User
from app.schemas import MockUser, Login
from app.services.auth_service import authenticate_user, hash_password
from app.services import auth_service
from unittest.mock import MagicMock
from app.utils import password_utils
from sqlalchemy.orm import Session
from fastapi import HTTPException
from jose import JWTError

TEST_DB_URL = "postgresql://test:test@localhost:5433/test_db"
engine = create_engine(TEST_DB_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class DummyDB:
    def __init__(self, user=None):
        self._user = user
    def query(self, model):
        class Q:
            def filter(self, *args, **kwargs):
                return self
            def first(self_inner):
                return None if self._user is None else self._user
                # return self._user
        return Q()

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

@pytest.mark.auth
def test_authenticate_user_success():
    db = MagicMock()
    hashed=password_utils.get_password_hash("pass")
    mock_user = MockUser(
        id=1, 
        name="Test User",
        email="email@test.com", 
        hashed_password=hashed,
        role=1
    )
    db.query().filter().first.return_value = mock_user
    
    token = auth_service.authenticate_user(db, "email@test.com", "pass")
    assert token is not None

@pytest.mark.auth
def test_authenticate_user_fail():
    db = MagicMock()
    db.query().filter().first.return_value = None
    token = auth_service.authenticate_user(db, "email@test.com", "wrong")
    assert token is None

@pytest.mark.auth
def test_send_reset_password_email_success(monkeypatch):
    db = MagicMock()
    user = MagicMock()
    user.hashed_password = None
    db.query().filter().first.return_value = user
    monkeypatch.setattr(password_utils, "get_password_hash", lambda x: "hashed")
    result = auth_service.send_reset_password_email(db, "email@test.com", "newpass")
    assert result is True

@pytest.mark.auth
def test_send_reset_password_email_fail():
    db = MagicMock()
    db.query().filter().first.return_value = None
    result = auth_service.send_reset_password_email(db, "email@test.com", "newpass")
    assert result is None
    
@pytest.mark.auth_service
def test_login_success(monkeypatch):
    fake_user = User(id=1, email="a@b.com", username="user1", name="Test", hashed_password="123", role_id=2)
    monkeypatch.setattr(auth_service, "authenticate_user", lambda db, email, pwd: fake_user)
    monkeypatch.setattr(auth_service, "create_access_token", lambda data: "fake-token")

    credentials = Login(email="a@b.com", hashed_password="123")
    result = auth_service.login(DummyDB(), credentials)
    assert result == {"access_token": "fake-token", "token_type": "bearer"}

@pytest.mark.auth_service
def test_login_fail(monkeypatch):
    monkeypatch.setattr(auth_service, "authenticate_user", lambda db, email, pwd: None)
    credentials = Login(email="a@b.com", hashed_password="wrong")
    result = auth_service.login(DummyDB(), credentials)
    assert result is None

@pytest.mark.auth_service
def test_get_current_user_success(monkeypatch):
    fake_user = User(id=1, email="a@b.com", username="user1", name="Test", hashed_password="123", role_id=2)
    db = DummyDB(user=fake_user)

    monkeypatch.setattr(auth_service.jwt, "decode", lambda token, key, algorithms: {"sub": "a@b.com", "id": 1})
    result = auth_service.get_current_user(db, token="valid-token")
    assert result.email == "a@b.com"

@pytest.mark.auth_service
def test_get_current_user_invalid_token(monkeypatch):
    db = DummyDB(user=None)
    monkeypatch.setattr(auth_service.jwt, "decode", lambda *args, **kwargs: (_ for _ in ()).throw(JWTError()))

    with pytest.raises(HTTPException) as exc:
        auth_service.get_current_user(db, token="bad-token")
    assert exc.value.status_code == 401

@pytest.mark.auth_service
def test_get_current_user_user_not_found(monkeypatch):
    db = DummyDB(user=None)
    monkeypatch.setattr(auth_service.jwt, "decode", lambda token, key, algorithms: {"sub": "a@b.com", "id": 99})

    with pytest.raises(HTTPException) as exc:
        auth_service.get_current_user(db, token="valid-token")
    assert exc.value.status_code == 401
    
@pytest.mark.auth_service
def test_get_current_user_missing_fields(monkeypatch):
    db = DummyDB()
    monkeypatch.setattr(auth_service.jwt, "decode", lambda *args, **kwargs: {"sub": None, "id": None})

    with pytest.raises(HTTPException) as exc:
        auth_service.get_current_user(db, token="fake-token")

    assert exc.value.status_code == 401
    assert exc.value.detail == "Could not validate credentials"