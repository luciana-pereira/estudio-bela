from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, auth_routes, client_routes, salon_routes # Importação das novas rotas
from app.config import engine, Base, SessionLocal
from app.models.role import Role
# Importante: Importar os modelos aqui garante que o SQLAlchemy os conheça antes do create_all
from app.models import user, client, service, appointment 
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_roles()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no Neon (Clients, Services, Appointments)
Base.metadata.create_all(bind=engine)

def seed_roles():
    db: Session = SessionLocal()
    # Roles definidas conforme o planejamento do PI2 [cite: 51]
    roles = ["admin", "cliente", "profissional"]
    for idx, role_name in enumerate(roles, start=1):
        if not db.query(Role).filter_by(id=idx).first():
            db.add(Role(id=idx, name=role_name))
    db.commit()
    db.close()

# Registro dos roteadores na API
app.include_router(user_routes.router, prefix="/users", tags=["users"])
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(client_routes.router, prefix="/clients", tags=["clients"])
app.include_router(salon_routes.router, prefix="/salon-services", tags=["salon-services"])

@app.get("/")
def read_root():
    return {"message": "API Estudio Bela está funcionando!"}