import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  offset: number;
}
