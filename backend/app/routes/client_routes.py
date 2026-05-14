from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas
from app.config import get_db
from app.services import client_service
from app.services.auth_service import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.ClientResponse)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db), current_user: schemas.UserResponse = Depends(get_current_user)):
    return client_service.create_client(db, client)

@router.get("/", response_model=list[schemas.ClientResponse])
def read_clients(db: Session = Depends(get_db), current_user: schemas.UserResponse = Depends(get_current_user)):
    return client_service.get_clients(db)