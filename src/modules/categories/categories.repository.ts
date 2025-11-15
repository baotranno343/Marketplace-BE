import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private prismaService: PrismaService) {}

  create(CreateCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({ data: CreateCategoryDto });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: number) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
