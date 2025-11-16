import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  email: string;
  @ApiProperty({ required: false })
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  phone: string;
  @ApiProperty({ required: false })
  @IsDateString()
  dateOfBirth: Date;
  @ApiProperty({ required: false })
  @IsString()
  profileImage: string;
  @ApiProperty({ required: false })
  @IsNumber()
  walletBalance: number;
}
