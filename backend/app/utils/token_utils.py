import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from app.config import SECRET_KEY, ALGORITHM
import bcrypt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#def verify_password(plain_password, hashed_password):
#    return pwd_context.verify(plain_password, hashed_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def create_jwt_token(user_id: int):
    expiration = datetime.utcnow() + timedelta(hours=1)
    token = jwt.encode({"sub": user_id, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
    return token

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_jwt
    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")
