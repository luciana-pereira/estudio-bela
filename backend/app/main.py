from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, auth_routes
from app.config import engine, Base, SessionLocal
from app.models.role import Role
from sqlalchemy.orm import Session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def seed_roles():
    db: Session = SessionLocal()
    roles = ["admin", "cliente", "profissional"]
    for idx, role_name in enumerate(roles, start=1):
        if not db.query(Role).filter_by(id=idx).first():
            db.add(Role(id=idx, name=role_name))
    db.commit()
    db.close()

@app.on_event("startup")
def startup_event():
    seed_roles()

app.include_router(user_routes.router, prefix="/users", tags=["users"])
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "API Espaço Bela está funcionando!"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app.main:app",
#         host="0.0.0.0",
#         port=8000,
#         reload=True
#     )

