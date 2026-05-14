from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from app.config import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    date_time = Column(DateTime, nullable=False) # Data e horário [cite: 224]
    status = Column(String, default="scheduled") # scheduled, completed, canceled
    
    # Relacionamentos definidos no seu fluxograma [cite: 298, 378]
    client_id = Column(Integer, ForeignKey("clients.id"))
    professional_id = Column(Integer, ForeignKey("users.id"))
    service_id = Column(Integer, ForeignKey("services.id"))

    client = relationship("Client")
    professional = relationship("User")
    service = relationship("Service")