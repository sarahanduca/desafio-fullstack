# Desafio fullstack

## Executando a aplicação

![pnpm](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white)

### Definição da .env
É necessário criar uma .env no diretório desafio-fullstack-api. O valor de `API_PORT` deve ser `8080`.

### Localmente

Após feito o clone do repositório, é necessário instalar as dependencias, execute o comando `pnpm install` nos diretório de API e Web. Dentro da pasta "desafio-fullstack-api" confirme primeiro se a variavél `POSTGRES_HOST` no arquivo .env está como `localhost`. Os valores da .env devem ser:

```
API_PORT=8080

POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="desafio"
POSTGRES_DB="desafiofullstack"
```

Então execute o comando `docker compose up postgres`. Com o docker em execução, utilize o comando `pnpm db:migrate` para executar as migrations, e após a execução, `pnpm db:seed` opicionalmente para o caso de seed do BD.

Agora o banco de dados está configurado e basta executar o serviço da API (que foi setado para ouvir na porta 8080). Sendo assim, execute o comando `pnpm start`.

É necessário esar dentro do respectivo diretório para a execussão do comando, portanto, para rodar o frontend da aplicação deve-se estra na pasta "desafio-fullstack-web" e executar o comando `pnpm dev`.

Ao final sua aplicação deve estar rodando normalmente na porta 3000.

### Utilizando Docker

![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

Após instalações das dependencias nos diretórios de API e Web, verifique se a variavél `POSTGRES_HOST` está como `postgres`, sendo assim, o network do docker pode se comunicar entre as aplicações.

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

  Retorna o novo nível editado.

* DELETE
  ```
  /levels/:id
  ```
  Deleta o nível selecionado, se não houver desenvolvedores associados.
* GET
  ```
    /levels/:id
  ```
  Retorna o nível do ID correspondente.
  - GET
  ```
    /levels/:id/developers
  ```
  Retorna todos os desenvolvedores associados aquele nível.

### Desenvolvedor

- GET

  ```
  /developers?page=1&limit=10
  ```

  Retorna todos os desenvolvedores do BD, com o a estrutura.

  ```
  {
    id: number,
    name: string,
    gender: string,
    birthday: Date,
    age: number,
    hobby: string,
    level: {
      id: number,
      level: string
    }
  }
  ```

* POST

  ```
  /developers
  ```

  Retorna o desenvolvedor que foi criado.

* PATCH

  ```
  /developers/:id
  ```

  Retorna o novo desenvolvedor editado.

* DELETE

  ```
  /developers/:id
  ```

  Deleta o desenvolvedor selecionado.

* GET
  ```
  /developers/:id
  ```
  Retorna o desenvolvedor do ID correspondente.

## Frontend

### Tecnologias utilizadas

![Nextjs](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white) e [SWR](https://swr.vercel.app/) para o fetch de dados no client-side.
