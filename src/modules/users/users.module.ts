import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersReposistory } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersReposistory],
  imports: [PrismaModule],
})
export class UsersModule {}
