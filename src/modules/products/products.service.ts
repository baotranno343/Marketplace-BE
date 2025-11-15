import { Injectable } from '@nestjs/common';
import { Product } from 'generated/prisma';
import { PaginatedResult } from 'src/common/utils/paginator.util';
import { ProductPaginateOptionsDTO } from '../users/dto/product-paginate-options.dto';
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

  async findProducts(
    productPaginateOptionsDTO: ProductPaginateOptionsDTO,
  ): Promise<PaginatedResult<Product>> {
    const products = await this.productsRepository.findAll({
      page: productPaginateOptionsDTO.page,
      perPage: productPaginateOptionsDTO.perPage,
    });
    return products;
  }

  findProduct(id: number) {
    const product = this.productsRepository.findOne(id);
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const data = mapUpdateProductDtoToPrisma(updateProductDto);
    const product = await this.productsRepository.update(id, data);
    return product;
  }

  async removeProduct(id: number) {
    const product = await this.productsRepository.remove(id);
    return product;
  }
}
