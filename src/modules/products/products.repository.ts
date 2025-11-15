import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductsRepository {
  constructor(private prismaService: PrismaService) {}
  create(product: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({
      data: product,
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
