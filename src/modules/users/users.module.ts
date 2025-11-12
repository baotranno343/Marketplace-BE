import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersReposistory } from './users.reposistory';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersReposistory],
  imports: [PrismaModule],
})
export class UsersModule {}
