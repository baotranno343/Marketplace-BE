import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from 'generated/prisma';
import { PaginateOptionsDTO } from 'src/common/dto/paginate-options.dto';
import { PaginatedResult } from 'src/common/utils/data-paginator.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findUsersPagination(@Query() query: PaginateOptionsDTO): Promise<PaginatedResult<User>> {
    return this.usersService.getUsersPagination({
      page: query.page,
      perPage: query.perPage,
    });
  }

  @Get(':id')
  findUser(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<User, 'password'> | null> {
    return this.usersService.findUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  softDeleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<User, 'password'>> {
    return this.usersService.softDeleteUser(id);
  }
  @Delete(':id/hard')
  removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<User, 'password'>> {
    return this.usersService.removeUser(id);
  }
}
