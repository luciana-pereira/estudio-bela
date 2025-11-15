import pytest
import uuid
from app.services.user_service import create_user, get_user_by_email, get_user
from unittest.mock import MagicMock
from fastapi import HTTPException
from app.services import user_service
from app.schemas import UserCreate, UserUpdate
from app.config import SessionLocal
from app.models.user import User
from app.models.role import Role


@pytest.mark.user
def test_create_and_get_user(db):
    user_data = UserCreate(
        name="Teste",
        username="teste",
        email="teste1@email.com",
        hashed_password="123456",
        role_id=1
    )
    user = create_user(db, user_data)
    assert user.email == "teste1@email.com"

    fetched_user = get_user(db, user.id)
    assert fetched_user.id == user.id

@pytest.mark.user
def test_get_nonexistent_user(db):
    user = get_user_by_email(db, "inexistente@email.com")
    assert user is None


@pytest.mark.user
def test_create_user_duplicate_email():
    db = MagicMock()
    user_data = MagicMock()
    db.query().filter().first.return_value = True
    with pytest.raises(ValueError):
        create_user(db, user_data)

@pytest.mark.user
def test_get_user_found():
    db = MagicMock()
    db.query().filter().first.return_value = {"id": 1}
    user = get_user(db, 1)
    assert user["id"] == 1

@pytest.mark.user
def test_get_user_not_found():
    db = MagicMock()
    db.query().filter().first.return_value = None
    user = get_user(db, 1)
    assert user is None
    
@pytest.mark.user_service
def test_create_user_role_not_found():
    db = SessionLocal()

    user_data = UserCreate(
        name="Test",
        username="testuser",
        email="test@example.com",
        hashed_password="123456",
        role_id=999  
    )
    with pytest.raises(HTTPException) as exc:
        user_service.create_user(db, user_data)
    assert exc.value.status_code == 400
    assert exc.value.detail == "Role not found"
    db.close()

@pytest.mark.user_service
def test_update_user_service_all_fields(monkeypatch):
    db = SessionLocal()

    role = db.query(Role).filter_by(name="cliente").first()

    unique_suffix = str(uuid.uuid4())[:8]

    db_user = User(
        name="Old",
        username=f"olduser_{unique_suffix}",
        email=f"old_{unique_suffix}@example.com",
        hashed_password="oldpass",
        role_id=role.id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    update_data = UserUpdate(
        name="New",
        username=f"newuser_{unique_suffix}",
        email=f"new_{unique_suffix}@example.com",
        hashed_password="newpass",
        role_id=role.id,
    )

    updated = user_service.update_user_service(db, db_user.id, update_data)

    assert updated.name == "New"
    assert updated.username==f"newuser_{unique_suffix}"
    assert updated.email==f"new_{unique_suffix}@example.com"
    assert updated.hashed_password != "newpass" 
    db.close()
    
@pytest.mark.user_service
def test_update_user_service_no_fields():
    db = SessionLocal()
    role = db.query(Role).filter_by(name="cliente").first()

    user = User(
        name="Keep",
        username="keepuser_" + str(uuid.uuid4())[:8],
        email="keep@example.com",
        hashed_password="keep",
        role_id=role.id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    update_data = UserUpdate()
    updated = user_service.update_user_service(db, user.id, update_data)

    assert updated.name == "Keep"
    assert updated.username.startswith("keepuser_")
    assert updated.email == "keep@example.com"
    assert updated.hashed_password == "keep"
    assert updated.role_id == role.id
    db.close()

def test_assign_role_to_user_user_not_found():
    db = SessionLocal()
    role_admin = db.query(Role).filter_by(name="admin").first()

    updated = user_service.assign_role_to_user(db, user_id=999999, role_id=role_admin.id)
    assert updated is None
    db.close()

@pytest.mark.user_service
def test_assign_role_to_user():
    db = SessionLocal()

    role_cliente = db.query(Role).filter_by(name="cliente").first()
    role_admin = db.query(Role).filter_by(name="admin").first()

    unique_suffix = str(uuid.uuid4())[:8]

    db_user = User(
        name="RoleTest",
        username=f"roletest_{unique_suffix}",
        email=f"role_{unique_suffix}@example.com",
        hashed_password="pass",
        role_id=role_cliente.id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    updated = user_service.assign_role_to_user(db, db_user.id, role_admin.id)
    assert updated.role_id == role_admin.id

    db.close()

