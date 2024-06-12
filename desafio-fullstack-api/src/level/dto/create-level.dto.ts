import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}
