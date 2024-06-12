import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { DeveloperService } from 'src/developer/developer.service';
import { LevelService } from 'src/level/level.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        connection: {
          host: process.env.POSTGRES_HOST,
          user: process.env.POSTGRES_USER,
          port: parseInt(process.env.POSTGRES_PORT),
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        },
      },
    }),
  ],
  providers: [DeveloperService, LevelService],
})
export class DatabaseModule {}
