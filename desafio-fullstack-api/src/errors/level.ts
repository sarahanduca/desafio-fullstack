import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundLevel extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Nível não encontrado',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class LevelWithDevelopersAssociated extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Nível possui desenvolvedores associados',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
