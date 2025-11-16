import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { dataPaginate, PaginatedResult } from 'src/common/utils/data-paginator.util';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersReposistory {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  findPagination({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatedResult<User>> {
    return dataPaginate(
      this.prisma.user,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
