from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import os

from app.models.user import User
from app.schemas import Login, Token
from app import models, schemas
from app.config import get_db
from app.utils.password_utils import verify_password, get_password_hash
from app.utils.token_utils import create_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
        
    return user

def login(db: Session, credentials: Login):
    # 'password' é o campo que vem do schema de Login
    user = authenticate_user(db, credentials.email, credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email, "id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> schemas.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        user_email: str = payload.get("sub")
        user_id: int = payload.get("id")
        if user_email is None or user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return schemas.User.model_validate(user)

# ADICIONADO: Função que o auth_routes.py está pedindo
def send_reset_password_email(db: Session, email: str, new_password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    
    # Atualiza para o novo hash usando nossa utilidade centralizada
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    return True