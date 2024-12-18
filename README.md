# Projeto AMcom Fullstack Challenge

Este é um projeto fullstack desenvolvido como resposta ao desafio [AMcom Fullstack Challenge](https://gitlab.com/amcom-sme/fullstack-challenge). O projeto consiste em uma aplicação de gerenciamento de vendas com backend em Django e frontend em React.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

```
/
|-- backend/    # API Django REST Framework
|-- frontend/   # Interface React
```

## Requisitos do Sistema

- Python 3.12
- Node.js v18.13.0 ou superior
- SQLite (ou outro banco de dados de sua preferência)

## Início Rápido

### 1. Backend (Django)

Para configurar e executar o backend, acesse a pasta `backend/` e siga as instruções detalhadas no [README do Backend](./backend/readme.md).

Principais comandos:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 2. Frontend (React)

Para configurar e executar o frontend, acesse a pasta `frontend/` e siga as instruções detalhadas no [README do Frontend](./frontend/README.md).

Principais comandos:
```bash
cd frontend
npm install
npm run dev
```

## Documentação Detalhada

- [Documentação do Backend](./backend/readme.md)
- [Documentação do Frontend](./frontend/README.md)

## Funcionalidades Principais

- Gerenciamento de vendas
- Controle de produtos
- Gestão de vendedores
- Cálculo de comissões
- Cadastro de clientes
- Relatórios de vendas e comissões

## Tecnologias Utilizadas

### Backend
- Django
- Django REST Framework
- SQLite
- Swagger/Redoc

### Frontend
- React.js
- Vite
- Styled Components

## Melhorias Futuras

- Implementação de testes automatizados
- Melhorias na documentação
- Deploy automatizado
- Otimizações de performance

## Autor

Este projeto foi desenvolvido como resposta ao [AMcom Fullstack Challenge](https://gitlab.com/amcom-sme/fullstack-challenge).

## Licença

Este projeto está sob a licença MIT. 