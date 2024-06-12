import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    page = Number(page);
    limit = Number(limit);

    return this.levelService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(+id);
  }

  @Get(':id/developers')
  findDevelopers(@Param('id') id: string) {
    return this.levelService.findDevelopers(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
