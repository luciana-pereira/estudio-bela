from sqlalchemy.orm import Session
from app.models.service import Service
from app import schemas

def create_salon_service(db: Session, service: schemas.ServiceCreate):
    new_service = Service(**service.model_dump())
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service

def get_salon_services(db: Session):
    return db.query(Service).all()