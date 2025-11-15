import pytest
from fastapi.testclient import TestClient
from app.main import app, seed_roles
from app.config import SessionLocal
from app.models.role import Role

client = TestClient(app)

@pytest.mark.main
def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API Estudio Bela está funcionando!"}

@pytest.mark.main
def test_seed_roles_inserts_roles():
    db = SessionLocal()
    seed_roles()
    roles = db.query(Role).all()
    role_names = [r.name for r in roles]
    assert set(role_names) >= {"admin", "cliente", "profissional"}
    db.close()
    
@pytest.mark.main
def test_seed_roles_adds_single_missing_role():
    db = SessionLocal()
    role_to_remove = db.query(Role).filter_by(id=3).first()
    if role_to_remove:
        db.delete(role_to_remove)
        db.commit()

    seed_roles()

    role = db.query(Role).filter_by(id=3).first()
    assert role is not None
    assert role.name == "profissional"
    db.close()

@pytest.mark.main
def test_app_lifespan_runs():
    with TestClient(app) as c:
        response = c.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "API Estudio Bela está funcionando!"}