from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.auth_service import login
from app.schemas import Login, Token
from app.services.user_service import get_user
from app.services.user_service import create_user
from app.schemas import UserCreate, UserResponse, UserUpdate
from app.config import get_db
from app.schemas import User
from app.utils import get_password_hash

router = APIRouter()

@router.post("/", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = create_user(db, user)
        return db_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.post("/login", response_model=Token)
def login_user(credentials: Login, db: Session = Depends(get_db)):
    token = login(db, credentials)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return token

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if user_update.name:
        db_user.name = user_update.name
    if user_update.email:
        db_user.email = user_update.email
    if user_update.username:
        db_user.username = user_update.username
    if user_update.hashed_password:
        db_user.hashed_password = get_password_hash(user_update.hashed_password)
    if user_update.role_id:
        role = db.query(Role).filter(Role.id == user_update.role_id).first()
        if not role:
            raise HTTPException(status_code=400, detail="Role not found")
        db_user.role_id = user_update.role_id

    db.commit()
    db.refresh(db_user)
    return db_user


