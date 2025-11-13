import { IsDate, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  id: number;
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
  CategoryId: number;
  @IsNumber()
  stock: number;
  //   @IsString()
  //   status: string;
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
  userId: number;
}
