import { configDotenv } from 'dotenv';

configDotenv({ path: './.env' });

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB || 'desafiofullstack',
      user: process.env.POSTGRES_USER || 'postgres',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      password: process.env.POSTGRES_PASSWORD || 'desafio',
      host: process.env.POSTGRES_HOST || 'postgres',
    },
    migrations: {
      tableName: 'migrations',
      directory: './scripts/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './scripts/seeds',
    },
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: process.env.POSTGRES_DB,
  //     user: process.env.POSTGRES_USER,
  //     port: parseInt(process.env.POSTGRES_PORT || ''),
  //     password: process.env.POSTGRES_PASSWORD,
  //     host: process.env.POSTGRES_HOST,
  //   },
  //   migrations: {
  //     tableName: 'migrations',
  //     directory: './scripts/migrations',
  //     extension: 'ts',
  //   },
  //   seeds: {
  //     directory: './scripts/seeds',
  //   },
  // },
};
