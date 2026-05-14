import bcrypt

def get_password_hash(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 1. Garante que a senha digitada seja bytes
    password_byte_enc = plain_password.encode('utf-8')
    
    # 2. Garante que o hash que veio do banco (string) vire bytes para o bcrypt
    hashed_password_byte_enc = hashed_password.encode('utf-8')
    
    # 3. Faz a comparação segura
    return bcrypt.checkpw(password_byte_enc, hashed_password_byte_enc)