import jwt
from datetime import datetime, timedelta, timezone
from app.config import SECRET_KEY, ALGORITHM

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Padrão de 30 minutos se não especificado
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    
    to_encode.update({"exp": expire})
    # Gera o token JWT usando a Secret Key do seu .env
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_jwt
    except jwt.ExpiredSignatureError:
        raise Exception("Token expirado")
    except jwt.InvalidTokenError:
        raise Exception("Token inválido")