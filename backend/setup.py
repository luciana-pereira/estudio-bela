from setuptools import setup, find_packages

setup(
    name="backend",
    version="0.1.0",
    description="Microserviço de gerenciamento de usuários para a aplicação Estúdio Bela",
    author="Luciana Pereira",
    author_email="luci.lv14@gmail.com",
    url="https://github.com/luciana-pereira/estudio-bela",  
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "fastapi==0.95.0",
        "sqlalchemy==2.0.15",
        "python-jose==3.4.0",
        "passlib[bcrypt]==1.7.4",
        "uvicorn[standard]==0.22.0",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.9',
)
