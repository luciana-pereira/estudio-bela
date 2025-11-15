PYTHON := $(shell \
	if command -v python3 >/dev/null 2>&1; then echo python3; \
	elif command -v python >/dev/null 2>&1; then echo python; \
	elif command -v py >/dev/null 2>&1; then echo py; \
	else echo ""; fi)

ifeq ($(PYTHON),)
$(error Nenhum comando Python encontrado! Instale python3, python ou py.)
endif

.PHONY: setup test coverage clean lint

setup:
	$(PYTHON) -m pip install --upgrade pip
	$(PYTHON) -m pip install -r requirements.txt

test:
	$(PYTHON) -m pytest -v --tb=short -o console_output_style=rich

coverage:
	$(PYTHON) -m coverage run --rcfile=.coveragerc -m pytest
	$(PYTHON) -m coverage report -m --rcfile=.coveragerc
	$(PYTHON) -m coverage html --rcfile=.coveragerc
	@echo "HTML report gerado em htmlcov/index.html"


lint:
	$(PYTHON) -m flake8 app tests

clean:
	rm -rf __pycache__ .pytest_cache .coverage htmlcov
