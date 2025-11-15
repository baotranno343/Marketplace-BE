import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  slug?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  range?: number;

  @ApiProperty({ required: false })
  featured?: boolean;

  @ApiProperty()
  @IsString()
  imageUrl: string;
}
