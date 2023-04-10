import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateCityDto {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  data: number;
}
