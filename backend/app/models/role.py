from sqlalchemy import Column, Integer, String
# Altere a linha abaixo:
from . import Base 

class Role(Base):
    __tablename__ = 'roles'
    # ... resto do seu código permanece igual
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
