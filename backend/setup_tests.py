import os
import subprocess
import sys
import time
import psycopg2
from rich.console import Console
from rich.progress import track

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from app.config import Base
from app.models.role import Role
from dotenv import load_dotenv

console = Console()
TEST_ENV_PATH = ".env.test"
DEFAULT_CONTENT = """TEST_DATABASE_URL=postgresql://test:test@localhost:5433/test_db
"""

def check_command(cmd):
    try:
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return True
    except Exception:
        return False

def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def wait_for_postgres(db_url, timeout=30):
    print("[INFO] Aguardando PostgreSQL iniciar...")

    base_url = db_url.rsplit("/", 1)[0] + "/postgres"

    end_time = time.time() + timeout

    while time.time() < end_time:
        try:
            engine = create_engine(base_url)
            conn = engine.connect()
            conn.close()
            print("[INFO] PostgreSQL respondeu!")
            return True
        except OperationalError:
            time.sleep(1)

    raise Exception("PostgreSQL não respondeu a tempo!")

def main():
    console.print("[bold green][INFO][/bold green] Criando .env.test se necessário...")
    if not os.path.exists(TEST_ENV_PATH):
        with open(TEST_ENV_PATH, "w") as f:
            f.write(DEFAULT_CONTENT)
        console.print("[bold cyan][CRIADO][/bold cyan] .env.test gerado automaticamente.")
    else:
        console.print("[bold green][OK][/bold green] .env.test já existe.")
        
    load_dotenv(TEST_ENV_PATH)
    TEST_DB_URL = os.getenv("TEST_DATABASE_URL")
        
    if not TEST_DB_URL:
        console.print("[bold red][ERRO][/bold red] TEST_DATABASE_URL não encontrado no .env.test!")
        sys.exit(1)
        
    console.print("[bold green][INFO][/bold green] Verificando Python...")
    if not check_command(["python3", "--version"]) and not check_command(["python", "--version"]):
        console.print("[bold red][ERRO][/bold red] Python não encontrado!")
        sys.exit(1)

    console.print("[bold green][INFO][/bold green] Verificando Docker...")
    if not check_command(["docker", "--version"]):
        console.print("[bold red][ERRO][/bold red] Docker não encontrado!")
        sys.exit(1)

    console.print("[bold green][INFO][/bold green] Instalando dependências...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

    console.print("[bold green][INFO][/bold green] Subindo container PostgreSQL para testes...")
    subprocess.run(["docker-compose", "-f", "docker-compose.test.yml", "up", "-d"], check=True)

    console.print("[bold green][INFO][/bold green] Aguardando PostgreSQL iniciar...")
    wait_for_postgres(TEST_DB_URL)
    console.print("[bold green][OK][/bold green] PostgreSQL está pronto para conexões.")

    console.print("[bold green][INFO][/bold green] Criando .env.test se necessário...")
    if not os.path.exists(TEST_ENV_PATH):
        with open(TEST_ENV_PATH, "w") as f:
            f.write(DEFAULT_CONTENT)
        console.print("[bold cyan][CRIADO][/bold cyan] .env.test gerado automaticamente.")
    else:
        console.print("[bold green][OK][/bold green] .env.test já existe.")
        
    for _ in track(range(5), description="Iniciando PostgreSQL..."):
        time.sleep(1)
        
    engine = create_engine(TEST_DB_URL.rsplit("/",1)[0] + "/postgres")
    with engine.begin() as conn:
        db_name = TEST_DB_URL.rsplit("/",1)[1]
        result = conn.execute(text(f"SELECT 1 FROM pg_database WHERE datname='{db_name}'"))
        if not result.scalar():
            print(f"[INFO] Criando database de testes '{db_name}'...")
            conn.execute(text(f"CREATE DATABASE {db_name}"))
    
    test_engine = create_engine(TEST_DB_URL)
    Base.metadata.create_all(bind=test_engine)
    TestingSessionLocal = sessionmaker(bind=test_engine)
    
    console.print("[bold green][INFO][/bold green] Populando dados iniciais...")
    session = TestingSessionLocal()
    session.execute(text("TRUNCATE TABLE users RESTART IDENTITY CASCADE"))

    roles = ["admin", "cliente", "profissional"]
    for idx, role_name in enumerate(roles, start=1):
        if not session.query(Role).filter_by(id=idx).first():
            session.add(Role(id=idx, name=role_name))
    session.commit()
    session.close()

    console.print("[bold green][INFO][/bold green] Executando testes com cobertura...")
    subprocess.run([
        sys.executable, "-m", "pytest", "tests",
        "--tb=short", "-o", "console_output_style=rich", "-v"
    ], check=True)

    console.print("[bold green][INFO][/bold green] Gerando relatório de cobertura...")
    subprocess.run([sys.executable, "-m", "coverage", "report", "-m"])
    subprocess.run([sys.executable, "-m", "coverage", "html"])

    console.print("[bold green][INFO][/bold green] Parando container PostgreSQL de teste...")
    subprocess.run(["docker-compose", "-f", "docker-compose.test.yml", "down"], check=True)

    console.print("[bold green][OK][/bold green] Testes concluídos com sucesso!")

if __name__ == "__main__":
    main()
