import { Injectable } from '@nestjs/common';
import { Product } from 'generated/prisma';
import { PaginatedResult } from 'src/common/utils/data-paginator.util';
import { PaginateOptionsDTO } from '../../common/dto/paginate-options.dto';
import { CreateProductDto } from './dto/create-product.dto';
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

  findProductsPagination(
    paginateOptionsDTO: PaginateOptionsDTO,
  ): Promise<PaginatedResult<Product>> {
    return this.productsRepository.findPagination({
      page: paginateOptionsDTO.page,
      perPage: paginateOptionsDTO.perPage,
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
