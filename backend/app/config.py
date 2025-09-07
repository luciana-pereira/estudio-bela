from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = "postgresql://db_mariah_estudio_user:eSNPNRjrYcR8kbsLaaX1rNuFKkoKdQXF@dpg-d0n8qqodl3ps73a04fjg-a/db_mariah_estudio"
SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ2R4emt4cGl0ZmlqamlmcXF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTgyNjYzMiwiZXhwIjoyMDQxNDAyNjMyfQ.yefQKwgNQqIv59f5XEa7WQKsWudBTj8kNfNM2f898oo"
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
