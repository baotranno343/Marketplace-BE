import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductStatus } from 'generated/prisma';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  discount: number;
  @IsNumber()
  CategoryId: string;
  @IsNumber()
  stock: number;
  @IsEnum(ProductStatus)
  status: ProductStatus;
  @IsBoolean()
  isFeatured: boolean;
  @IsNumber()
  averageRating: number;
  @IsNumber()
  totalReviews: number;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
  @IsDate()
  deletedAt: Date;
  @IsNumber()
  userId: string;
}
