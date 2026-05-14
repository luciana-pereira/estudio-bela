from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas
from app.config import get_db
from app.services import salon_service

router = APIRouter()

@router.post("/", response_model=schemas.ServiceResponse)
def create_service(service: schemas.ServiceCreate, db: Session = Depends(get_db)):
    return salon_service.create_salon_service(db, service)

@router.get("/", response_model=list[schemas.ServiceResponse])
def read_services(db: Session = Depends(get_db)):
    return salon_service.get_salon_services(db)