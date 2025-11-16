# Espaço Bela | Back End

## :page_facing_up: Indice
1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação e Preparação do Ambiente](#instalação-e-preparação-do-ambiente)
4. [Executar Projeto](#executar-projeto)
5. [Testes e Banco de Dados de Teste](#testes-e-banco-de-dados-de-teste)
6. [Funcionalidades](#funcionalidades)
7. [Endpoints](#endpoints)
8. [Estrutura](#estrutura)
9. [Contribuindo](#contribuindo)
10. [Licença](#licença)
11. [Contato](#contato)

---

## Introdução

Este microserviço é responsável por gerenciar usuários, administradores e profissionais.

Principais funções:
- CRUD de usuários
- Autenticação e autorização
- Gerenciamento de perfis

Tecnologias:
- **Python 3.x**
- **FastAPI**
- **PostgreSQL**
- **Docker & Docker Compose**
- **Makefile para automação**

---

## Pré-requisitos

Antes de começar, verifique se você possui:

- [GIT](https://git-scm.com/) na maquina no Terminal (CMD/PowerShell), com o comando _**git --version**_,  se não tiver, instale com o [Link](https://git-scm.com/downloads) na maquina, feche e abra o Terminal (CMD/PowerShell), para verificar se a instalçao foi bem sucedida com o comando _**git --version**_ e verificar se possui as demais versões abaixo.
- [Python](https://www.python.org) no Git Bash com o comando _**python --version**_ ou _**python3 --version**_, se não tiver, baixe no [link](https://www.python.org/downloads/) feche e abra o Git Bash e verifique se a instalçao foi bem sucedida com o _**python --version**_ ou _**python3 --version**_.
- [pip](https://pip.pypa.io/en/stable/) na maquina no Terminal (CMD/PowerShell), com o comando _**pip --version**_,  se não tiver, instale
- [Docker](https://www.docker.com/) na maquina no Terminal (CMD/PowerShell/Ubuntu), com o comando _**docker --version**_,  se não tiver, instale
- [docker-compose](https://docs.docker.com/compose/) na maquina no Terminal (CMD/PowerShell/Ubuntu), com o comando _**docker-compose --version**_

Caso não possua algum deles, siga os links acima para instalação. 

--- 

## Instalação e Preparação do Ambiente
O projeto possui automações via Makefile e Docker para simplificar a configuração.

- Criação do ambiente virtual
- Instalação de dependências
- Criação do arquivo .env.test
- Verificação e criação do container PostgreSQL para testes

Para rodar tudo automaticamente:

  ```bash
  # Clonar repositório
  git clone https://github.com/luciana-pereira/estudio-bela.git
  cd pi-estudio-bela/backend

  # Criar e subir containers (API + DB)
  make setup
  ```

#### 📖 Cheat Sheet — Makefile & Docker

**🔧 Setup do ambiente**
- Atualiza o pip
- Instala dependências do **requirements.txt (Produção)**
```bash
make setup
```
- Instala dependências do **requirements-dev.txt (Desenvolovimento-local)** 
```bash
make setup-dev
```

**🐳 Containers**
- Sobe containers da aplicação e banco (via docker-compose.yml)
```bash
make up
```
- Derruba containers
```bash
make down
```
- Exibe logs da aplicação em tempo real
```bash
make logs
```
- Derruba e recria containers de teste (docker-compose.test.yml)
- Útil para resetar banco de testes
```bash
make reset-db
```
**🧪 Testes**
- Cria/verifica .env.test automaticamente
- Executa Pytest em modo verboso
- Saída formatada e legível
```bash
make test
```
- Executa testes com Coverage
- Mostra relatório no terminal
- Gera relatório HTML em htmlcov/index.html
```bash
make coverage
```

**🧹 Manutenção**
- Executa Flake8 para verificar estilo e qualidade do código
```bash
make lint
```
- Remove caches e relatórios temporários gerados por testes e execução :
  - __pycache__ → bytecode Python.
  - .pytest_cache → cache do Pytest.
  - .coverage → arquivo de cobertura.
  - htmlcov → relatório HTML de cobertura.
```bash
make clean
```
⚠️ Importante: Docker precisa estar ativo no sistema antes de rodar este script.

---

## Executar Projeto
Para rodar o projeto, siga os passos abaixo:

1. Clone o repositório (se já não tiver feito):
   ```bash
   git clone https://github.com/luciana-pereira/estudio-bela.git

2. Navegue até o diretório do projeto:
   ```bash
   cd pi-estudio-bela/backend

Nesta etapa, podera executar o projeto:

1. 🐳 Via Docker
Desta forma a API estará disponível em: 👉 http://localhost:8000
 ```bash
 make up
```
2. 💻 Localmente (sem Docker)
Criando o ambiente virtual para isolar as dependências:
```bash
python -m venv venv
```
Ative o ambiente ou se já tiver criado o ambiente, execute:

 ```bash
  source venv/Scripts/activate   # Windows
  # ou
  . venv/Scripts/activate        # Linux/Mac
 ```

Instale as dependencias:
 ```bash
 make setup
```
Rode a aplicação  
```bash
 python3 -m app.main 

# ou

 uvicorn app.main:app --reload
 ```

--- 

## Testes e Banco de Dados de Teste 🧪
O projeto utiliza Pytest com um banco PostgreSQL exclusivo para testes.

#### Automatização

```bash
make test
```
Esse comando:
- Criação do `.env.test` se não existir
- Sobe container PostgreSQL de teste

```bash
make coverage
```
Esse comando:
- Executa Pytest com Coverage
- Exibe relatório de cobertura no terminal

--- 

## Funcionalidades

- **Cadastro de Usuários**: Adicionar novos usuários ao sistema.
- **Autenticação**: Verificar credenciais e emitir tokens de sessão.
- **Gerenciamento de Perfis**: Atualizar e recuperar informações dos perfis de usuário.
- **Autorização**: Controlar o acesso baseado em papeis e permissões.
- **Recuperação de Senha**: Permitir que usuários solicitem redefinição de senha.

--- 

## Endpoints

### Cadastro de usuários

- **POST** `/users`
  - **Descrição**: Cria um novo usuário.
  - **Corpo da Requisição**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "role": "string"
    }
    ```
  - **Resposta**:
    - **200 OK**: usuário criado com sucesso.
    - **400 Bad Request**: Erro de validação dos dados.

### Autenticação

- **POST** `/auth/login`
  - **Descrissão**: Autentica um usuário e retorna um token de sessão.
  - **Corpo da Requisição**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Resposta**:
    - **200 OK**: Token de sessão retornado.
    - **401 Unauthorized**: Credenciais invalidas.

### Gerenciamento de Perfis

- **GET** `/users/{userId}`
  - **Descrissão**: Recupera as informações do perfil de um usuário.
  - **Resposta**:
    - **200 OK**: Detalhes do usuário.
    - **404 Not Found**: usuário não encontrado.

- **PUT** `/users/{userId}`
  - **Descrissão**: Atualiza as informações do perfil de um usuário.
  - **Corpo da Requisição**:
    ```json
    {
      "email": "string",
      "password": "string",
      "role": "string"
    }
    ```
  - **Resposta**:
    - **200 OK**: Perfil atualizado com sucesso.
    - **400 Bad Request**: Erro de validação dos dados.

### Recuperação de Senha

- **POST** `/api/auth/reset-password`
  - **Descrissão**: Inicia o processo de Recuperação de senha.
  - **Corpo da Requisição**:
    ```json
    {
      "email": "string"
    }
    ```
  - **Resposta**:
    - **200 OK**: E-mail de Recuperação enviado.
    - **404 Not Found**: E-mail não encontrado.
      
---

👉 Documentação completa disponível em **Swagger** acesse _**[Swagger UI](https://estudio-bela.vercel.app/docs)**_ 

<img width="1865" height="971" alt="image" src="https://github.com/user-attachments/assets/c33e68a2-9cbe-4ceb-8cdd-918112b36595" />

---

## Estrutura 
   ```bash
  backend/
  ├── app/                     # Código principal da aplicação
  │   ├── __init__.py          # Arquivo de inicialização do módulo
  │   ├── config.py            # Configurações da aplicação
  │   ├── models/              # Modelos de dados SQLAlchemy
  │   │   ├── __init__.py
  │   │   ├── user.py          # Modelo de usuário
  │   │   └── role.py          # Modelo de papel (role)
  │   ├── routes/              # Rotas e endpoints
  │   │   ├── __init__.py
  │   │   ├── user_routes.py   # Endpoints para gerenciamento de usuários
  │   │   └── auth_routes.py   # Endpoints para autenticação
  │   ├── services/            # Lógica de negócios e serviços
  │   │   ├── __init__.py
  │   │   ├── user_service.py  # Serviços relacionados a usuários
  │   │   └── auth_service.py  # Serviços relacionados à autenticação
  │   ├── utils/               # Utilitários e helpers
  │   │   ├── __init__.py
  │   │   └── token_utils.py   # Funções utilitárias para tokens
  │   ├── main.py              # Arquivo principal para execução da aplicação
  │   └── schemas.py           # Schemas Pydantic
  │
  ├── tests/                   # Testes automatizados
  │   ├── __init__.py
  │   ├── test_user_management.py  # Testes para o gerenciamento de usuários
  │   ├── test_authentication.py   # Testes para autenticação
  │   └── conftest.py              # Configuração de testes
  │
  ├── migrations/              # Scripts de migração de banco de dados
  │   ├── versions/            # Versões das migrações
  │   └── __init__.py
  │
  ├── .env                     # Arquivo de configuração de ambiente
  ├── .gitignore               # Arquivos e diretórios a serem ignorados pelo Git
  ├── Dockerfile               # Dockerfile para containerização
  ├── docker-compose.yml       # Docker Compose para orquestração
  ├── Makefile                 # Automação de tarefas
  ├── requirements.txt         # Dependências do Python
  ├── LICENSE                  # Licença do projeto
  ├── README.md                # Documentação do projeto
  ├── alembic.ini              # Configuração de migrações
  └── setup.py                 # Script de instalação do projeto

```

---

## Contribuição
1. Faça um Fork do Repositório
2. Crie uma branch (git checkout -b feature/nova-feature)
3. Commit suas alterações (git commit -m 'feat: nova feature')
4. Push para a branch (git push origin feature/nova-feature)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## Contato
Para mais informações ou suporte, entre em contato com:

- GitHub Issues: Issues
