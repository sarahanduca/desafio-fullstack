import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  level: string;
}
