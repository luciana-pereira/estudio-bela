from sqlalchemy import Column, Integer, String, Float
from app.config import Base

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False) # Ex: Corte, Coloração [cite: 132, 139]
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    duration_minutes = Column(Integer, nullable=False) # Essencial para gestão do tempo [cite: 36]