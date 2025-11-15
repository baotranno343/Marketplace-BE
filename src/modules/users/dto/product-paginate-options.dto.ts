// src/products/dto/paginate-options.dto.ts
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ProductPaginateOptionsDTO {
  @IsOptional()
  @Type(() => Number) // chuyển '2' -> 2
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  perPage?: number = 10;
}
