import type { Knex } from 'knex';
import { configDotenv } from 'dotenv';

configDotenv({ path: './.env' });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      port: parseInt(process.env.POSTGRES_PORT || ''),
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
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

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      port: parseInt(process.env.POSTGRES_PORT || ''),
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
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
};

module.exports = config;
