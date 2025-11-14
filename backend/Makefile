PYTHON := $(shell \
    if command -v python3 >/dev/null 2>&1; then echo python3; \
    elif command -v python >/dev/null 2>&1; then echo python; \
    elif command -v py >/dev/null 2>&1; then echo py; \
    else echo ""; fi)

ifeq ($(PYTHON),)
$(error Nenhum comando Python encontrado! Instale python3, python ou py.)
endif

.PHONY: setup test coverage

setup:
	$(PYTHON) setup_tests.py

test:
	pytest -v --tb=short -o console_output_style=rich

coverage:
	coverage run -m pytest
	coverage report -m
	coverage html
	@echo "HTML report generated in htmlcov/index.html"
