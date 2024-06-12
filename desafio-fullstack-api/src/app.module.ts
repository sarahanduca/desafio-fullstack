import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DeveloperModule } from './developer/developer.module';
import { LevelModule } from './level/level.module';
import { DeveloperController } from './developer/developer.controller';
import { LevelController } from './level/level.controller';
import { DeveloperService } from './developer/developer.service';
import { LevelService } from './level/level.service';

@Module({
  imports: [DatabaseModule, DeveloperModule, LevelModule],
  controllers: [DeveloperController, LevelController],
  providers: [DeveloperService, LevelService],
})
export class AppModule {}
