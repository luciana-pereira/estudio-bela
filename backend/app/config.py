from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = "postgresql://db_estudio_bela_user:dRCC28Iyvz6TqS7gAW48u38H97PqhyKj@dpg-d34ujohr0fns73bl94p0-a.oregon-postgres.render.com/db_estudio_bela"
SECRET_KEY = "rnd_1niMEvyh72iEGT4gxhMLhFFOIn12"
ALGORITHM ="HS256"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
