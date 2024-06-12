import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { InjectConnection } from 'nestjs-knex';
import { Knex } from 'knex';
import { LevelWithDevelopersAssociated, NotFoundLevel } from 'src/errors/level';

@Injectable()
export class LevelService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createLevelDto: CreateLevelDto) {
    const { level } = createLevelDto;

    const newLevel = await this.knex('level').insert({ level }, [
      'id',
      'level',
    ]);

    return newLevel;
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const total = await this.knex('level').count('* as count');
    const totalLevels: number = Number(total[0].count);

    if (!totalLevels) {
      throw new NotFoundLevel();
    }
    const levels = await this.knex('level')
      .select('*')
      .limit(limit)
      .offset(offset);

    const paginationMeta = {
      total: totalLevels,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(totalLevels / limit),
    };

    return { data: levels, meta: paginationMeta };
  }

  async findOne(id: number) {
    const levelExists = await this.knex('level')
      .where('id', id)
      .count('* as count');

    if (levelExists[0].count == 0) {
      throw new NotFoundLevel();
    }

    const level = await this.knex('level').select('*').where('id', id).first();

    return level;
  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    const { level } = updateLevelDto;

    const levelExists = await this.knex('level')
      .where('id', id)
      .count('* as count');

    if (levelExists[0].count == 0) {
      throw new NotFoundLevel();
    }

    const levelUpdated = await this.knex('level')
      .where('id', id)
      .update({ level }, ['id', 'level']);

    return levelUpdated;
  }

  async remove(id: number) {
    const level = await this.knex('level').where('id', id).count('* as count');

    if (level[0].count == 0) {
      throw new NotFoundLevel();
    }

    const associatedDevelopers = await this.knex('developer')
      .select('level_id')
      .where('level_id', id)
      .first();

    if (associatedDevelopers) {
      throw new LevelWithDevelopersAssociated();
    }

    await this.knex('level').where('id', '=', id).del();
  }
}
