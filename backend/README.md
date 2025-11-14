# Espaço Bela | Back End

## :page_facing_up: Indice
1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Executar Projeto](#executar-projeto)
4. [Funcionalidades](#funcionalidades)
5. [Endpoints](#endpoints)
6. [Estrutura](#estrutura)
7. [Contribuindo](#contribuindo)
8. [Licença](#licença)
9. [Contato](#contato)

## Introdução

Este microserviço é responsavel por gerenciar usuários, administrados e outros profissionais. Ele oferece funcionalidades para criação, leitura, atualização e exclusão de perfis de usuários, bem como gerenciamento de autenticação e autorização.

O projeto utiliza:
- **Python 3.x**
- **Banco de Dados PostgreSQL**

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos atendidos:

- Verifique se tem o [GIT](https://git-scm.com/) na maquina no Terminal (CMD/PowerShell), com o comando _**git --version**_,  se não tiver, instale com o [Link](https://git-scm.com/downloads) na maquina, feche e abra o Terminal (CMD/PowerShell), para verificar se a instalçao foi bem sucedida com o comando _**git --version**_ e verificar se possui as demais versões abaixo.
- Verifique se tem o [Python](https://www.python.org) no Git Bash com o comando _**python --version**_ ou _**python3 --version**_, se não tiver, baixe no [link](https://www.python.org/downloads/) feche e abra o Git Bash e verifique se a instalçao foi bem sucedida com o _**python --version**_ ou _**python3 --version**_.

## Executar Projeto

Para rodar o projeto, siga os passos abaixo:

1. Clone o repositório (se já não tiver feito):

   ```bash
   git clone https://github.com/luciana-pereira/estudio-bela.git

2. Navegue até o diretório do projeto:

   ```bash
   cd pi-estudio-bela/backend

3. Crie o ambiente virtual para isolar as dependências, se já tiver criado pule para a etapa 5:

   ```bash
   python -m venv venv

4. Ative o ambiente

   ```bash
   source venv/Scripts/activate

5. Se já tiver criado o ambiente, acesse:

   ```bash
   . venv/Scripts/activate

6. Instale as dependencias:

   ```bash
   pip install -r requirements.txt

7. Rode a aplicação localmente:
   
   ```bash
   python3 -m app.main 

   ou

   uvicorn app.main:app --reload


## Funcionalidades

- **Cadastro de Usuários**: Adicionar novos usuários ao sistema.
- **Autenticação**: Verificar credenciais e emitir tokens de sessão.
- **Gerenciamento de Perfis**: Atualizar e recuperar informações dos perfis de usuário.
- **Autorização**: Controlar o acesso baseado em papeis e permissões.
- **Recuperação de Senha**: Permitir que usuários solicitem redefinição de senha.

## Endpoints

### Cadastro de usuários

- **POST** `/users`
  - **Descrissão**: Cria um novo usuário.
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
Para ver a documentação completa abaixo no **Swagger** acesse _**[Swagger UI](https://estudio-bela.vercel.app/docs)**_ 

<img width="1865" height="971" alt="image" src="https://github.com/user-attachments/assets/c33e68a2-9cbe-4ceb-8cdd-918112b36595" />

---
## Estrutura 
   ```bash
  backend/
  ├── app/                     # Código principal da aplicação
  │   ├── __init__.py          # Arquivo de inicialização do módulo
  │   ├── config.py            # Configurações da aplicação
  │   ├── models/              # Modelos de dados
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
  │   └── main.py              # Arquivo principal para execução da aplicação
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
  ├── requirements.txt         # Dependências do Python
  ├── LICENSE                  # Licença do projeto
  ├── README.md                # Documentação do projeto
  └── setup.py                 # Script de instalação do projeto

```
## Descrição dos diretórios e arquivos utilizados

- **app/**: Contém o código principal da aplicação, incluindo modelos de dados, rotas, serviços e utilitários.
  - **models/**: Define os modelos de dados usados pelo microserviço.
  - **routes/**: Define as rotas e endpoints da API.
  - **services/**: Contém a lógica de negócios e serviços que processam as requisições.
  - **utils/**: Funções utilitárias, como helpers para manipulação de tokens.
  - **main.py**: Ponto de entrada principal para executar a aplicação.
- **tests/**: Contém os testes automatizados para garantir que o microserviço funcione conforme o esperado.
  - **conftest.py**: Configuração para os testes.
- **migrations/**: Scripts e arquivos para gerenciar a migração de banco de dados.
- **.env**: Arquivo para variáveis de ambiente, como configurações de banco de dados e chaves de API.
- **.gitignore**: Lista arquivos e diretórios que o Git deve ignorar.
- **Dockerfile**: Define como o microserviço deve ser construído e executado em um container Docker.
- **docker-compose.yml**: Define a configuração do Docker Compose para orquestrar múltiplos containers, se necessário.
- **requirements.txt**: Lista as dependências do Python que precisam ser instaladas.
- **LICENSE**: Arquivo de licença do projeto, por exemplo, Licença MIT.
- **README.md**: Documentação geral do projeto, incluindo como configurar, executar e contribuir.
- **setup.py**: Script para instalação do projeto como um pacote Python.

---

## Contribuição
1. Faça um Fork do Repositório
2. Crie uma Branch para sua Feature
3. Adicione e Faça Commit das suas Alterações
4. Envie um Pull Request

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.

## Contato
Para mais informações ou suporte, entre em contato com:

- GitHub Issues: Issues
