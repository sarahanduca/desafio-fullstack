import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('developer', (table) => {
    table.increments('id');

    table.integer('level_id').unsigned().notNullable();
    table.string('name').notNullable();
    table.string('gender', 1).notNullable();
    table.date('birthday').notNullable();
    table.string('hobby').notNullable();

    table.foreign('level_id').references('id').inTable('level');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('developer');
}
