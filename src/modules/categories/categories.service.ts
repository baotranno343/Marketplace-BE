import { Injectable } from '@nestjs/common';
import { Category } from 'generated/prisma/client';
import { PaginateOptionsDTO } from 'src/common/dto/paginate-options.dto';
import { PaginatedResult } from 'src/common/utils/data-paginator.util';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  mapCreateCategoryDtoToPrisma,
  mapUpdateCategoryDtoToPrisma,
} from './mapper/category.mapper';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const data = mapCreateCategoryDtoToPrisma(createCategoryDto);
    return this.categoriesRepository.create(data);
  }

  findCategoriesPagination(
    paginateOptionsDTO: PaginateOptionsDTO,
  ): Promise<PaginatedResult<Category>> {
    return this.categoriesRepository.findPagination({
      page: paginateOptionsDTO.page,
      perPage: paginateOptionsDTO.perPage,
    });
  }

  findCategory(id: string): Promise<Category | null> {
    return this.categoriesRepository.findOne(id);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const data = mapUpdateCategoryDtoToPrisma(updateCategoryDto);
    return this.categoriesRepository.update(id, data);
  }
  async softDeleteCategory(id: string): Promise<Category> {
    return await this.categoriesRepository.softDelete(id);
  }
  async removeCategory(id: string): Promise<Category> {
    return await this.categoriesRepository.remove(id);
  }
}
