import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PaginateOptionsDTO } from 'src/common/dto/paginate-options.dto';
import { PaginatedResult } from 'src/common/utils/data-paginator.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersReposistory } from './users.repository';
@Injectable()
export class UsersService {
  constructor(private usersReposistory: UsersReposistory) {}
  createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersReposistory.create(createUserDto);
  }

  getUsersPagination(paginateOptionsDTO: PaginateOptionsDTO): Promise<PaginatedResult<User>> {
    return this.usersReposistory.findPagination({
      page: paginateOptionsDTO.page,
      perPage: paginateOptionsDTO.perPage,
    });
  }

  findUser(id: string): Promise<Omit<User, 'password'> | null> {
    return this.usersReposistory.findOne(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersReposistory.update(id, updateUserDto);
  }
  softDeleteUser(id: string): Promise<Omit<User, 'password'>> {
    return this.usersReposistory.softDelete(id);
  }
  removeUser(id: string): Promise<Omit<User, 'password'>> {
    return this.usersReposistory.remove(id);
  }
}
