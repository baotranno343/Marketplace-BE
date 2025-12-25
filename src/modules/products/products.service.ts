import { Injectable } from '@nestjs/common';
import { Prisma, Product } from 'generated/prisma';
import { PaginatedResult } from 'src/common/utils/data-paginator.util';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsQueryDTO } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { mapCreateProductDtoToPrisma, mapUpdateProductDtoToPrisma } from './mapper/product.mapper';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const data = mapCreateProductDtoToPrisma(createProductDto);
    return await this.productsRepository.create(data);
  }
  findProductsPagination(query: FindProductsQueryDTO): Promise<PaginatedResult<Product>> {
    const { page, perPage, category, variant, sort = 'name', order = 'asc' } = query;

    const where: Prisma.ProductWhereInput = {};
    if (category) where.category = { slug: category };
    if (variant) where.status = variant;

    const finalWhere = Object.keys(where).length ? where : undefined;

    const allowedSortFields = ['name', 'price', 'createdAt', 'updatedAt'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'name';

    return this.productsRepository.findPagination({
      page,
      perPage,
      where: finalWhere,
      orderBy: {
        [sortField]: order,
      },
      include: {
        category: true,
        images: true,
        ratingDistribution: true,
      },
    });
  }

  findProduct(id: string): Promise<Product | null> {
    return this.productsRepository.findOne(id);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const data = mapUpdateProductDtoToPrisma(updateProductDto);
    return await this.productsRepository.update(id, data);
  }
  async softDeleteProduct(id: string): Promise<Product> {
    return await this.productsRepository.softDelete(id);
  }
  async removeProduct(id: string): Promise<Product> {
    return await this.productsRepository.remove(id);
  }
}
