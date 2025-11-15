PYTHON := $(shell \
	if command -v python3 >/dev/null 2>&1; then echo python3; \
	elif command -v python >/dev/null 2>&1; then echo python; \
	elif command -v py >/dev/null 2>&1; then echo py; \
	else echo ""; fi)

ifeq ($(PYTHON),)
$(error Nenhum comando Python encontrado! Instale python3, python ou py.)
endif

.PHONY: setup test coverage clean lint up down logs envtest reset-db

# Instala dependências
setup:
	$(PYTHON) -m pip install --upgrade pip
	$(PYTHON) -m pip install -r requirements.txt

# Cria .env.test se não existir
envtest:
	@if [ ! -f .env.test ]; then \
		echo "TEST_DATABASE_URL=postgresql://test:test@localhost:5433/test_db" > .env.test; \
		echo ".env.test criado"; \
	else \
		echo ".env.test já existe"; \
	fi

# Executa testes (garante envtest antes)
test: envtest
	$(PYTHON) -m pytest -v --tb=short -o console_output_style=rich

# Executa testes com cobertura
coverage:
	$(PYTHON) -m coverage run --rcfile=.coveragerc -m pytest
	$(PYTHON) -m coverage report -m --rcfile=.coveragerc
	$(PYTHON) -m coverage html --rcfile=.coveragerc
	@echo "HTML report gerado em htmlcov/index.html"

# Linter
lint:
	$(PYTHON) -m flake8 app tests

# Limpeza de arquivos temporários
clean:
	rm -rf __pycache__ .pytest_cache .coverage htmlcov

# Sobe containers (API + DB)
up:
	docker-compose up -d

# Derruba containers
down:
	docker-compose down

# Mostra logs da aplicação
logs:
	docker-compose logs -f app

# Reseta banco de dados de teste
reset-db:
	docker-compose -f docker-compose.test.yml down
	docker-compose -f docker-compose.test.yml up -d
