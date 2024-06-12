import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  level_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  hobby: string;
}
