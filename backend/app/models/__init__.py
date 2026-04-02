# REMOVA a linha: from sqlalchemy.orm import declarative_base
# REMOVA a linha: Base = declarative_base()

# USE O BASE DO SEU ARQUIVO DE CONFIGURAÇÃO
from app.config import Base 

# Agora importe os modelos para eles se registrarem no Base correto
from .user import User
from .role import Role
from .client import Client
from .service import Service
from .appointment import Appointment