from sqlalchemy import Column, Integer, String, Date, Text, DateTime
from sqlalchemy.sql import func
from app.config import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    
    # CPF e Endereço são requisitos explícitos do seu relatório 
    cpf = Column(String, unique=True, index=True, nullable=False) 
    address = Column(String, nullable=True) 
    
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    birth_date = Column(Date, nullable=True)
    
    # Prontuário Estético para evitar falhas no atendimento [cite: 32]
    hair_type = Column(String, nullable=True)
    chemical_history = Column(Text, nullable=True)
    allergies = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())