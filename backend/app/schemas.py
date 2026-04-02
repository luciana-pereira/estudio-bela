from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime

# 1. ESPELHO DO BANCO DE DADOS: USUÁRIO
class User(BaseModel):
    id: int
    username: str
    name: str
    email: str
    hashed_password: str
    role_id: int
    
    model_config = {
        "from_attributes": True
    }

# 2. ENTRADA DE DADOS: CRIAÇÃO DE USUÁRIO
class UserCreate(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str
    role_id: int

# 3. ENTRADA DE DADOS: ATUALIZAÇÃO DE USUÁRIO
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    role_id: Optional[int] = None 
    
# 4. SAÍDA DE DADOS: USUÁRIO (O QUE A API DEVOLVE)
class UserResponse(BaseModel):
    id: int
    name: str
    username: str
    email: EmailStr
    role_id: int

    model_config = {
        "from_attributes": True
    }
        
# 5. ENTRADA DE DADOS: LOGIN E TOKEN
class Login(BaseModel):
    email: EmailStr
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

class ResetPassword(BaseModel):
    email: EmailStr
    new_password: str

# --- NOVOS SCHEMAS PARA O ESTÚDIO BELA ---

# 6. CLIENTES (Requisitos do Relatório PI2)
class ClientBase(BaseModel):
    full_name: str
    cpf: str # Identificado como dado essencial no relatório [cite: 361]
    phone: str # Requisito do PI2 [cite: 362]
    email: Optional[EmailStr] = None
    address: Optional[str] = None # Requisito do PI2 [cite: 362]
    birth_date: Optional[date] = None
    hair_type: Optional[str] = None
    chemical_history: Optional[str] = None
    allergies: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientResponse(ClientBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

# 7. SERVIÇOS (Preços e Duração)
class ServiceBase(BaseModel):
    name: str # Ex: Corte de Cabelo, Coloração [cite: 132, 139]
    description: Optional[str] = None
    price: float # Ex: R$ 50,00 [cite: 133]
    duration_minutes: int # Essencial para gestão da agenda [cite: 133]

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int

    model_config = {
        "from_attributes": True
    }

# 8. AGENDAMENTOS (O Coração do Sistema)
class AppointmentBase(BaseModel):
    date_time: datetime # Data e horário [cite: 238, 239]
    client_id: int
    professional_id: int
    service_id: int

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: int
    status: str
    client: ClientResponse
    service: ServiceResponse
    # professional_id: int (Pode ser expandido para UserResponse depois)
    
    model_config = {
        "from_attributes": True
    }

# Mock para testes
class MockUser:
    def __init__(self, id, name, email, hashed_password, role):
        self.id = id
        self.name = name
        self.email = email
        self.hashed_password = hashed_password
        self.role = role