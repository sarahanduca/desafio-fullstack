# Desafio fullstack

## Executando a aplicação

![pnpm](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white)

### Localmente

Após feito o clone do repositório, é necessário instalar as dependencias, execute o comando `pnpm install`. Com as dependências em ordem é necessário configurar o banco de dados. Dentro da pasta "desafio-fullstack-api" confirme primeiro se a variavél `POSTGRES_HOST` no arquivo .env está como "localhost", este deve ser seu valor, e então execute o comando `docker compose up postgres`. Com o docker em execução, utilize o comando `pnpm db:migrate` para executar as migrations, e após a execução, `pnpm db:seed` opicionalmente para o caso de seed do BD.

Agora o banco de dados está configurado e basta executar o serviço da API (que foi setado para ouvir na porta 8080). Sendo assim, execute o comando `pnpm start`.

É necessário esar dentro do respectivo diretório para a execussão do comando, portanto, para rodar o frontend da aplicação deve-se estra na pasta "desafio-fullstack-web" e executar o comando `pnpm run dev`.

Ao final sua aplicação deve estar rodando normalmente na porta 3000.

### Utilizando Docker

![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

Deve ser feito a mesma etapa anterior para a configuração do banco de dados, após isso, mudar o valor da variavel `POSTGRES_HOST` para "postgres", sendo assim, o networking do docker pode comunicar entre as aplicação.

Com isso feito, basta rodar o comando `docker compose up` na raiz da aplicação, desafio-fullstack.

## Backend

### Tecnologias utilizadas

![NestJs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) [Knex.js](https://knexjs.org/) como query builder.

### Nivel

- GET

  ```
  /levels?page=1&limit=10
  ```

  Retorna todos os níveis do BD, com o a estrutura.

  ```
  {
    id: number,
    level: string
  }
  ```

- POST
  ```
  /levels
  ```
  Retorna o nível que foi criado.

* PATCH

  ```
  /levels/:id
  ```

  Retorna o novo nível editado

* DELETE
  ```
  /levels/:id
  ```
  Deleta o nível selecionado, se não houver desenvolvedores associados

## Frontend

### Tecnologias utilizadas

![Nextjs](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
