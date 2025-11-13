import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersReposistory } from './users.repository';
@Injectable()
export class UsersService {
  constructor(private usersReposistory: UsersReposistory) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  getUsers(): any {
    return this.usersReposistory.findAll({});
  }

  findOne(id: number) {
    return this.usersReposistory.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
