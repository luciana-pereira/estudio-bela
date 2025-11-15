from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.schemas import UserCreate, UserUpdate
from app.models.user import User
from app.models.role import Role
from app.utils import get_password_hash

MAX_PASSWORD_LENGTH = 72

def create_user(db: Session, user: UserCreate):

    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise ValueError("Email já cadastrado")
    
    role = db.query(Role).filter(Role.id == user.role_id).first()
    if not role:
        raise HTTPException(status_code=400, detail="Role not found")

    password = user.hashed_password[:MAX_PASSWORD_LENGTH]  
    hashed_password = get_password_hash(password)
    
    db_user = User(
        name=user.name,
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role_id=user.role_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def update_user_service(db: Session, user_id: int, user_update: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    if user_update.name:
        user.name = user_update.name
    if user_update.email:
        user.email = user_update.email
    if user_update.username:
        user.username = user_update.username
    if user_update.hashed_password:
        user.hashed_password = get_password_hash(user_update.hashed_password)
    if user_update.role_id is not None:
        user.role_id = user_update.role_id

    db.commit()
    db.refresh(user)
    return user

def assign_role_to_user(db: Session, user_id: int, role_id: int):
    user = get_user(db, user_id)
    if user:
        user.role_id = role_id
        db.commit()
        db.refresh(user)
    return user

