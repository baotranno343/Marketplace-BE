// import { Injectable } from '@nestjs/common';
// import { Prisma, User } from 'generated/prisma';
// import { ApiResponse } from 'src/common/utils/api-response.util';
// import { paginate } from 'src/common/utils/paginator.util';
// import { PrismaService } from 'src/modules/prisma/prisma.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UsersReposistory {
//   constructor(private prisma: PrismaService) {}
//   create(_createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll({
//     where,
//     orderBy,
//     page,
//     perPage,
//   }: {
//     where?: Prisma.UserWhereInput;
//     orderBy?: Prisma.UserOrderByWithRelationInput;
//     page?: number;
//     perPage?: number;
//   }): Promise<any> {
//     return paginate(
//       this.prisma.user,
//       {
//         where,
//         orderBy,
//       },
//       {
//         page,
//         perPage,
//       },
//     );
//   }

//   async findOne(id: number): Promise<ApiResponse<User | null>> {
//     const user = await this.prisma.user.findUnique({ where: { id } });
//     return ApiResponse.ok(user);
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
