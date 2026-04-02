from sqlalchemy.orm import Session
from app.models.client import Client
from app import schemas
from fastapi import HTTPException, status

def create_client(db: Session, client: schemas.ClientCreate):
    # Verifica se o CPF já existe (Chave Primária Lógica do PI2)
    db_client = db.query(Client).filter(Client.cpf == client.cpf).first()
    if db_client:
        raise HTTPException(status_code=400, detail="CPF já cadastrado.")
    
    new_client = Client(**client.model_dump())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

def get_clients(db: Session):
    return db.query(Client).all()