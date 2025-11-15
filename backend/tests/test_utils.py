import jwt
import time
import pytest
from app.utils import token_utils, password_utils
from datetime import timedelta
from app.config import SECRET_KEY, ALGORITHM


def test_password_hash_and_verify():
    password = "mysecret"
    hashed = password_utils.get_password_hash(password)
    assert password_utils.verify_password(password, hashed) is True
    assert password_utils.verify_password("wrong", hashed) is False

def test_create_and_decode_jwt_token():
    user_id = 123
    token = token_utils.create_jwt_token(user_id)
    decoded = token_utils.decode_access_token(token)
    assert decoded["sub"] == user_id

def test_create_access_token_and_decode():
    data = {"user_id": 1}
    token = token_utils.create_access_token(data)
    decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    assert decoded["user_id"] == 1

def test_decode_access_token_invalid():
    with pytest.raises(Exception, match="Invalid token"):
        token_utils.decode_access_token("invalid.token.here")

def test_decode_access_token_expired():
    token = token_utils.create_access_token(
        {"user_id": 1},
        expires_delta=timedelta(seconds=-1)
    )

    with pytest.raises(Exception, match="Token has expired"):
        token_utils.decode_access_token(token)
