import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('developer').del();

  await knex('developer').insert([
    {
      id: 1,
      name: 'João da Silva',
      gender: 'M',
      birthday: '1990-01-01',
      age: 31,
      hobby: 'Jogar futebol',
      level_id: 2,
    },
    {
      id: 2,
      name: 'Rebeca Souza',
      gender: 'F',
      birthday: '1990-01-01',
      age: 31,
      hobby: 'Ler livro',
      level_id: 1,
    },
    {
      id: 3,
      name: 'Joana Goth',
      gender: 'M',
      birthday: '1990-01-01',
      age: 31,
      hobby: 'Jogar videogame',
      level_id: 3,
    },
  ]);
}
