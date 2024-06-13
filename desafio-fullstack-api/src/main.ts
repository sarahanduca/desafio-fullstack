import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Knex from 'knex';
async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const knexConfig = require('../knexfile');
  const knex = Knex(knexConfig.development);
  await knex.migrate.latest();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.API_PORT);
}
bootstrap();
