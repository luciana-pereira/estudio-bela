from pydantic import BaseModel, EmailStr
from typing import Optional


class User(BaseModel):
    id: int
    username: str
    name: str
    email: str
    hashed_password: str
    role_id: int

class UserCreate(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str
    role: int

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    username: Optional[str] = None
    hashed_password: Optional[str] = None
    role_id: Optional[int] = None 
    
class UserResponse(BaseModel):
    id: int
    name: str
    username: str
    email: EmailStr
    role_id: int

class Config:
    orm_mode = True
        
class Login(BaseModel):
    email: str
    hashed_password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

    
class ResetPassword(BaseModel):
    email: EmailStr
    new_password: str

