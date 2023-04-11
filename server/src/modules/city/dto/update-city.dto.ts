import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCityDto {
  @IsNumber()
  @IsNotEmpty()
  data: number;
}
