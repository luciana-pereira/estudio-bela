import pytest
from fastapi.testclient import TestClient
from app.routes import auth_routes
from fastapi import FastAPI
from unittest.mock import patch

app = FastAPI()
app.include_router(auth_routes.router)

@pytest.fixture
def client():
    return TestClient(app)

@pytest.mark.auth_routes
def test_login_success(client):
    with patch("app.routes.auth_routes.authenticate_user", return_value={"access_token": "token", "token_type": "bearer"}):
        response = client.post("/login", json={"email": "a@b.com", "hashed_password": "123456"})
        assert response.status_code == 200
        assert "access_token" in response.json()

@pytest.mark.auth_routes
def test_login_fail(client):
    with patch("app.routes.auth_routes.authenticate_user", return_value=None):
        response = client.post("/login", json={"email": "a@b.com", "hashed_password": "wrong"})
        assert response.status_code == 401

@pytest.mark.auth_routes
def test_logout(client):
    response = client.post("/logout")
    assert response.status_code == 200
    assert response.json() == {"message": "Logged out"}

@pytest.mark.auth_routes
def test_reset_password_success(client):
    with patch("app.routes.auth_routes.send_reset_password_email", return_value=True):
        response = client.post("/reset-password", json={"email": "a@b.com", "new_password": "123456"})
        assert response.status_code == 200

@pytest.mark.auth_routes
def test_reset_password_fail(client):
    with patch("app.routes.auth_routes.send_reset_password_email", return_value=False):
        response = client.post("/reset-password", json={"email": "a@b.com", "new_password": "123456"})
        assert response.status_code == 404
