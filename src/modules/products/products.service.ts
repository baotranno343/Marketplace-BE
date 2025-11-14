import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { apiPaginate } from 'src/common/utils/paginator.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  async createProduct(createProductDto: CreateProductDto) {
    await this.productsRepository.create(createProductDto);
    return ApiResponse.ok(null, null);
  }

  findProducts() {
    const products = this.productsRepository.findAll();
    return apiPaginate(products);
  }

  findProduct(id: number) {
    const product = this.productsRepository.findOne(id);
    return ApiResponse.ok(product, null);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);
    return ApiResponse.ok(null, null);
  }

  async removeProduct(id: number) {
    await this.productsRepository.remove(id);
    return ApiResponse.ok(null, null);
  }
}
