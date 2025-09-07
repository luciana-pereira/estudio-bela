from fastapi import APIRouter, HTTPException, Depends
from app.schemas import Login, Token
from app.services.auth_service import authenticate_user, send_reset_password_email
from app import schemas
from app.config import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/login", response_model=Token)
def login_route(credentials: Login, db: Session = Depends(get_db)):
    # print("Tentando login com:", credentials.email)
    token = authenticate_user(db, credentials.email, credentials.hashed_password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return token

@router.post("/logout")
def logout():
    return {"message": "Logged out"}

@router.post("/reset-password")
def reset_password(request: schemas.ResetPassword, db: Session = Depends(get_db)):
    result = send_reset_password_email(db, request.email, new_password=request.new_password)
    if not result:
        raise HTTPException(status_code=404, detail="Error resetting password")
    return {"message": "Password reset successful"}
