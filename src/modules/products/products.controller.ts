import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginateOptionsDTO } from '../../common/dto/paginate-options.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findProductsPagination(@Query() query: PaginateOptionsDTO) {
    return this.productsService.findProductsPagination({
      page: query.page,
      perPage: query.perPage,
    });
  }

  @Get(':id')
  findProduct(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.findProduct(id);
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }
  @Delete(':id')
  softDeleteProduct(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.softDeleteProduct(id);
  }
  @Delete(':id/hard')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.removeProduct(id);
  }
}
