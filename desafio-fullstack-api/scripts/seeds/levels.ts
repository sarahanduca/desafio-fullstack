import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('level').del();

  await knex('level').insert([
    { id: 1, level: 'Junior A' },
    { id: 2, level: 'Junior B' },
    { id: 3, level: 'Junior C' },
  ]);
}
