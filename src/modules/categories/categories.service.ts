import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { apiPaginate } from 'src/common/utils/paginator.util';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    await this.categoriesRepository.create(createCategoryDto);
    return ApiResponse.ok(null, null);
  }

  findCategories() {
    const categories = this.categoriesRepository.findAll();
    return apiPaginate(categories);
  }

  findCategory(id: number) {
    const category = this.categoriesRepository.findOne(id);
    return ApiResponse.ok(category, null);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return ApiResponse.ok(null, null);
  }

  async removeCategory(id: number) {
    await this.categoriesRepository.remove(id);
    return ApiResponse.ok(null, null);
  }
}
