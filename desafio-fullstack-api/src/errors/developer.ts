import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundDeveloper extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Desenvolvedor não encontrado',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class CantCreateWithInvalidLevel extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Cadastro de desenvolvedor não permitido com nível inexistente',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
