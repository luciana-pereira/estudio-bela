from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Importações internas do projeto
from app import schemas
from app.config import get_db
from app.services.auth_service import login, send_reset_password_email

# DEFINIÇÃO DO ROTEADOR (O que estava faltando)
router = APIRouter()

@router.post("/login", response_model=schemas.Token)
def login_route(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Endpoint compatível com o padrão OAuth2 (Swagger Authorize) 
    e requisições JSON via Frontend.
    """
    # Mapeia o 'username' do formulário para o 'email' do nosso schema
    credentials = schemas.Login(email=form_data.username, password=form_data.password)
    
    result = login(db, credentials)
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="E-mail ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return result

@router.post("/logout")
def logout():
    return {"message": "Sessão encerrada"}

@router.post("/reset-password")
def reset_password(request: schemas.ResetPassword, db: Session = Depends(get_db)):
    result = send_reset_password_email(db, request.email, request.new_password)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Usuário não encontrado"
        )
    return {"message": "Senha redefinida com sucesso"}