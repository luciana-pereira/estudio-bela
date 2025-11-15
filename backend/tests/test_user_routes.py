import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from app.routes import user_routes
from unittest.mock import patch
from app.models import User
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.config import Base, get_db
import os


app = FastAPI()
app.include_router(user_routes.router)

# Usa a URL do banco de testes criada pelo setup
TEST_DB_URL = os.getenv("TEST_DATABASE_URL")
engine = create_engine(TEST_DB_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db():
    """Sessão de banco de dados de teste"""
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def client(db):
    app.dependency_overrides[get_db] = lambda: db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

@pytest.mark.user_routes
def test_register_user_success(client):
    with patch(
        "app.routes.user_routes.create_user", 
        return_value={
            "id": 1,
            "username": "user1", 
            "name": "User One",
            "email": "a@b.com",
            "hashed_password": "123456",
            "role_id": 1
        }
    ):
        response = client.post("/", json={
                "username": "user1",
                "name": "User One",
                "email": "a@b.com",
                "hashed_password": "123456",
                "role_id": 1
            }
        )
        assert response.status_code == 200

@pytest.mark.user_routes
def test_register_user_fail(client):
    with patch("app.routes.user_routes.create_user", side_effect=ValueError("Duplicate")):
        response = client.post("/", json={
                "id": 1,
                "username": "user1",
                "name": "User One",
                "email": "a@b.com",
                "hashed_password": "123456",
                "role_id": 1
            }
        )        
        assert response.status_code == 400

@pytest.mark.user_routes
def test_read_user_found(client):
    with patch("app.routes.user_routes.get_user", return_value={
                "id": 1,
                "username": "user1",
                "name": "User One",
                "email": "user1@example.com",
                "hashed_password": "pass",
                "role_id": 1
            }
        ):
        response = client.get("/1")
        assert response.status_code == 200

@pytest.mark.user_routes
def test_read_user_not_found(client):
    with patch("app.routes.user_routes.get_user", return_value=None):
        response = client.get("/1")
        assert response.status_code == 404

@pytest.mark.user_routes
def test_login_user_success(client):
    with patch("app.routes.user_routes.login", return_value={"access_token": "token", "token_type": "bearer"}):
        response = client.post("/login", json={"email": "a@b.com", "hashed_password": "123456"})
        assert response.status_code == 200

@pytest.mark.user_routes
def test_login_user_fail(client):
    with patch("app.routes.user_routes.login", return_value=None):
        response = client.post("/login", json={"email": "a@b.com", "hashed_password": "wrong"})
        assert response.status_code == 401

@pytest.mark.user_routes 
def test_update_user_success(client, db): 
    db_user = User( 
        name="Old Name", 
        username="user1", 
        email="a@b.com", 
        hashed_password="123456", 
        role_id=2 
    ) 
    
    with patch("app.routes.user_routes.get_user", return_value=db_user), \
        patch("app.services.user_service.update_user_service", return_value=None):
        response = client.put("/1", json={ 
                "name": "test", 
                "username": "user1", 
                "email": "a@b.com", 
                "hashed_password": "123456", 
                "role_id": 2 
            }) 
    
    assert response.status_code == 200 
    assert response.json()["name"] == "test"

@pytest.mark.user_routes
def test_update_user_fail(client):
    with patch("app.routes.user_routes.get_user", return_value=None):
        response = client.put("/1", json={"name": "New Name"})
        assert response.status_code == 404
        
@pytest.mark.user_routes 
def test_update_user_service_returns_none(client, db): 
    db_user = User( 
        name="Old Name", 
        username="user1", 
        email="a@b.com", 
        hashed_password="123456", 
        role_id=2 
    ) 
    
    with patch("app.routes.user_routes.get_user", return_value=db_user), \
        patch("app.services.user_service.update_user_service", return_value=None):
        response = client.put("/8", json={ 
                "name": "test", 
                "username": "user1", 
                "email": "a@b.com", 
                "hashed_password": "123456", 
                "role_id": 2 
            }) 
    
    assert response.status_code == 404
    assert response.json()["detail"] == "Not Found"