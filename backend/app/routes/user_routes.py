from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

# Importando os serviços e a segurança
from app.services.auth_service import login, get_current_user
from app.services.user_service import create_user, get_user, update_user_service

# Importando os Schemas e Configurações
from app.schemas import User, UserCreate, UserResponse, UserUpdate, Login, Token
from app.config import get_db

router = APIRouter()

# --- ROTA DE PERFIL (PROTEGIDA) ---
@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    """
    Retorna os dados do usuário dono do Token JWT enviado no cabeçalho.
    """
    return current_user

# --- REGISTRO DE USUÁRIO ---
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # O service agora já lança HTTPException (400) se o email existir.
    return create_user(db, user)

# --- LOGIN (DENTRO DE USER_ROUTES) ---
@router.post("/login", response_model=Token)
def login_user(credentials: Login, db: Session = Depends(get_db)):
    # O service.login já valida a senha e gera o token ou lança 401.
    return login(db, credentials)

# --- BUSCA POR ID ---
@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    return get_user(db, user_id=user_id)

# --- ATUALIZAÇÃO ---
@router.put("/{user_id}", response_model=UserResponse)
def update_user_route(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    return update_user_service(db, user_id, user_update)