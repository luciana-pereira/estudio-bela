from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.schemas import UserCreate, UserUpdate
from app.models.user import User
from app.models.role import Role
from app.utils.password_utils import get_password_hash

def create_user(db: Session, user: UserCreate):
    # 1. Validação de Unicidade (E-mail)
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email já cadastrado"
        )
    
    # 2. Validação de Unicidade (Username)
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Nome de usuário já está em uso"
        )
    
    # 3. Verificação de Role
    role = db.query(Role).filter(Role.id == user.role_id).first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Role não encontrada"
        )

    # 4. Geração do Hash
    hashed_pwd = get_password_hash(user.password)
    
    # 5. Instanciação do Modelo
    db_user = User(
        name=user.name,
        username=user.username,
        email=user.email,
        hashed_password=hashed_pwd, 
        role_id=user.role_id,
    )
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Erro interno ao salvar no banco: {str(e)}"
        )

def get_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Usuário não encontrado"
        )
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def update_user_service(db: Session, user_id: int, user_update: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Usuário não encontrado"
        )

    if user_update.name:
        user.name = user_update.name
    if user_update.email:
        # Validação extra: se mudar o email, checar se o novo já existe
        existing = db.query(User).filter(User.email == user_update.email).first()
        if existing and existing.id != user_id:
            raise HTTPException(status_code=400, detail="Novo email já em uso")
        user.email = user_update.email
    if user_update.username:
        user.username = user_update.username
        
    if user_update.password:
        user.hashed_password = get_password_hash(user_update.password)
        
    if user_update.role_id is not None:
        user.role_id = user_update.role_id

    try:
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro ao atualizar usuário")

def assign_role_to_user(db: Session, user_id: int, role_id: int):
    user = get_user(db, user_id)
    user.role_id = role_id
    db.commit()
    db.refresh(user)
    return user