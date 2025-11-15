import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { apiPaginate, PaginatedResult } from 'src/common/utils/paginator.util';
import { Product } from './../../../generated/prisma/index.d';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private prismaService: PrismaService) {}
  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prismaService.product.create({
      data: data,
    });
  }

  async findAll({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    page?: number | string | undefined;
    perPage?: number | string | undefined;
  }): Promise<PaginatedResult<Product>> {
    return apiPaginate(this.prismaService.product, { where, orderBy }, { page, perPage });
  }

  findOne(id: string): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: data,
    });
  }
  softDelete(id: string): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  remove(id: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
