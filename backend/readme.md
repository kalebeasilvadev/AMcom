# Projeto de Vendas com Django

Este é um projeto de exemplo utilizando Django para gerenciar vendas, produtos, vendedores e comissões. Este projeto serve como backend para o desafio do link: [Fullstack Challenge](https://gitlab.com/amcom-sme/fullstack-challenge).

## Estrutura do Projeto

- `app/`: Contém os aplicativos Django, incluindo modelos, serializers e views.
- `core/`: Contém as configurações do projeto Django.
- `manage.py`: Script de gerenciamento do Django.

## Configuração do Ambiente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/kalebeasilvadev/AMcom.git
   cd fullstack-challenge
   ```

2. **Crie um ambiente virtual:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows use `venv\Scripts\activate`
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure o banco de dados:**
   - Atualize as configurações do banco de dados em `core/settings.py` para refletir suas configurações locais (ex.: PostgreSQL, SQLite, etc.).

5. **Aplique as migrações:**
   ```bash
   python manage.py migrate
   ```

6. **Crie um superusuário:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Inicie o servidor de desenvolvimento:**
   ```bash
   python manage.py runserver
   ```

## Estrutura dos Aplicativos

### `app/models/`

- `comissoe.py`: Define o modelo de Comissão.
- `item_venda.py`: Define o modelo de ItemVenda.
- `produto.py`: Define o modelo de Produto.
- `venda.py`: Define o modelo de Venda.
- `vendedor.py`: Define o modelo de Vendedor.
- `cliente.py`: Define o modelo de Cliente.

### `app/serializer/`

- `venda.py`: Define os serializers para Venda e ItemVenda.
- `produto.py`: Define os serializers para Produto.
- `vendedor.py`: Define os serializers para Vendedor.
- `comissao.py`: Define os serializers para Comissão.
- `cliente.py`: Define os serializers para Cliente.

### `app/views/`

- `venda.py`: Views relacionadas às vendas.
- `produto.py`: Views relacionadas aos produtos.
- `vendedor.py`: Views relacionadas aos vendedores.
- `comissao.py`: Views relacionadas às comissões.
- `cliente.py`: Views relacionadas aos clientes.

## Endpoints da API

A API fornece os seguintes endpoints para interação:

- **Venda**: `/api/venda/`
- **Vendedor**: `/api/vendedor/`
- **Produto**: `/api/produto/`
- **Comissão**: `/api/comissao/`
- **Cliente**: `/api/cliente/`
- **Relatório de Comissão**: `/api/comissao-report/`
- **Obter Token**: `/api/token/`
- **Atualizar Token**: `/api/token/refresh/`
- **Documentação da API**: `/docs/`
- **Administração**: `/admin/`

## Documentação da API

A documentação interativa da API pode ser acessada no endpoint `/docs/`, utilizando **Swagger** ou **Redoc**.


## Tecnologias Utilizadas

- **Django**: Framework principal para o backend.
- **Django REST Framework**: Para criação de APIs RESTful.
- **Sqlite**: Banco de dados recomendado (pode ser configurado conforme preferência).
- **Swagger/Redoc**: Para documentação interativa da API.

## Melhorias Futuras

- Implementar testes de unitarios.
- Configurar deploy automático para ambientes de produção.

## Autor

Este projeto foi desenvolvido para o desafio [Fullstack Challenge](https://gitlab.com/amcom-sme/fullstack-challenge).

