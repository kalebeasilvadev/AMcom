# FrontEnd AMcom

Este projeto é a interface frontend para o desafio AMcom Fullstack. Ele foi desenvolvido utilizando as ferramentas e
padrões modernos para integração com o backend baseado em Django.

## Requisitos Pré-Requisitos

Antes de iniciar o projeto, certifique-se de:

1. **Backend em Execução**: Este frontend depende do backend implementado em Django. Certifique-se de configurá-lo e
   iniciá-lo corretamente.
2. **Versão do Node.js**: O projeto foi desenvolvido e testado com a versão **v18.13.0** do Node.js. Certifique-se de
   instalar esta versão ou superior.

## Instalação

Clone o repositório e instale as dependências necessárias:

```bash
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Ao iniciar, você verá no console algo semelhante a isto:

```bash
 VITE v4.4.9  ready in 310 ms

  ➔  Local:   http://localhost:5173/
  ➔  Network: use --host to expose
  ➔  press h to show help
```

Abra o navegador e acesse a URL fornecida, como [http://localhost:5173/](http://localhost:5173/). A porta **5173** pode
variar, então sempre confira o log do console para confirmar o endereço correto.

## Acesso ao Sistema

1. **Login**: Use o nome de usuário e a senha criados no backend Django utilizando o comando `createsuperuser`. Caso
   ainda não tenha feito, execute o seguinte comando no backend:

    ```bash
    python manage.py createsuperuser
    ```

2. Use essas credenciais para acessar o sistema pelo frontend.

## Estrutura do Projeto

Abaixo está uma breve descrição da estrutura de pastas e arquivos principais:

```
/
|-- src/
|   |-- assets/         # Arquivos estáticos (imagens, ícones, etc.)
|   |-- components/     # Componentes reutilizáveis do React
|   |-- pages/          # Páginas principais do sistema
|   |-- store/          # Configuração Context API para gerenciamento de estado
|   |-- functions/      # Funções utilitárias
|   |-- App.jsx         # Componente raiz
|   |-- main.jsx        # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- **React.js**: Biblioteca principal para desenvolvimento da interface.
- **Vite**: Ferramenta de build para um ambiente de desenvolvimento mais rápido.
- **Styled Components**: Biblioteca para estilização de componentes.

## Funcionalidades

O sistema inclui:

- **Autenticação**: Login seguro utilizando credenciais do backend.
- **Consumo de API**: Integração direta com os endpoints do backend em Django.

## Testes

Ainda não implementados. Recomendamos configurar ferramentas como **Jest** ou **React Testing Library** para cobrir as
funcionalidades principais.

## Problemas Conhecidos

- Certifique-se de que o backend está funcionando antes de acessar o frontend.
- Confira o console do navegador para erros relacionados a API ou configuração de ambiente.

## Melhorias Futuras

- Implementar testes automatizados.
- Melhorar a documentação do código.

## Autor

Desenvolvido para o desafio [AMcom Fullstack Challenge](https://gitlab.com/amcom-sme/fullstack-challenge).

Entre em contato para dúvidas ou sugestões!

