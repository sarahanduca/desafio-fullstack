import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';
import {
  CantCreateWithInvalidLevel,
  NotFoundDeveloper,
} from 'src/errors/developer';

@Injectable()
export class DeveloperService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    const { name, gender, birthday, level_id, hobby } = createDeveloperDto;

    const levelExists = await this.knex('level')
      .where('id', level_id)
      .count('* as count');

    if (levelExists[0].count == 0) {
      throw new CantCreateWithInvalidLevel();
    }

    const newDeveloper = await this.knex('developer').insert(
      {
        name,
        gender,
        birthday,
        level_id,
        hobby,
      },
      ['id', 'name', 'gender', 'birthday', 'level_id', 'hobby'],
    );

    return newDeveloper;
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const total = await this.knex('developer').count('* as count');
    const totalDevelopers: number = Number(total[0].count);

    if (!totalDevelopers) {
      if (!totalDevelopers) {
        throw new NotFoundDeveloper();
      }
    }

    const developers = (
      await this.knex
        .select(
          'developer.*',
          'level.id as level_id',
          'level.level as level_name',
          this.knex.raw(
            'EXTRACT(YEAR FROM AGE(NOW(), developer.birthday)) as age',
          ),
        )
        .from('developer')
        .leftJoin('level', 'developer.level_id', 'level.id')
        .limit(limit)
        .offset(offset)
    ).map((developer) => ({
      ...developer,
      level: {
        id: developer.level_id,
        level: developer.level_name,
      },
      level_id: undefined,
      level_name: undefined,
    }));

    const paginationMeta = {
      total: totalDevelopers,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(totalDevelopers / limit),
    };

    return { data: developers, meta: paginationMeta };
  }

  async findOne(id: number) {
    const developerExists = await this.knex('developer')
      .where('id', id)
      .count('* as count');

    if (developerExists[0].count == 0) {
      throw new NotFoundDeveloper();
    }

    const developer = await this.knex('developer').where('id', id).first();

    return developer;
  }

  async update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.knex('developer')
      .where('id', id)
      .count('* as count');

    if (developer[0].count == 0) {
      throw new NotFoundDeveloper();
    }

    const { name, hobby, level_id, gender, birthday } = updateDeveloperDto;

    const updatedDeveloper = await this.knex('developer')
      .where('id', id)
      .update({ name, hobby, level_id, gender, birthday }, [
        'name',
        'hobby',
        'level_id',
        'gender',
        'birthday',
      ]);

    return updatedDeveloper;
  }

  async remove(id: number) {
    const developer = await this.knex('developer')
      .where('id', id)
      .count('* as count');

    if (developer[0].count == 0) {
      throw new NotFoundDeveloper();
    }

    await this.knex('developer').where('id', id).del();
  }
}
