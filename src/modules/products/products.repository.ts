import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private prismaService: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }
  softDelete(id: number) {
    return this.prismaService.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  remove(id: number) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
