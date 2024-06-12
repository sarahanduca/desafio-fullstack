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
