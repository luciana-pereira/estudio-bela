from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.auth_service import login
from app.services.user_service import create_user, get_user, update_user_service
from app.schemas import User, UserCreate, UserResponse, UserUpdate, Login, Token
from app.config import get_db

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
def update_user_route(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = update_user_service(db, user_id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="Not Found")

    return updated_user
