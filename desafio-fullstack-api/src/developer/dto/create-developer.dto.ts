import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  @IsNotEmpty()
  id: string;

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

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  hobby: string;
}
