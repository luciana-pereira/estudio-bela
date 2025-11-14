import pytest
from app.services.user_service import create_user, get_user_by_email, get_user
from app.schemas import UserCreate

@pytest.mark.user
def test_create_and_get_user(db):
    user_data = UserCreate(
        username="teste",
        email="teste@email.com",
        password="123456",
        role=1,
        name="Teste"
    )
    user = create_user(db, user_data)
    assert user.email == "teste@email.com"

    fetched_user = get_user(db, user.id)
    assert fetched_user.id == user.id

@pytest.mark.user
def test_get_nonexistent_user(db):
    user = get_user_by_email(db, "inexistente@email.com")
    assert user is None
