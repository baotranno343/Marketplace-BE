import { Module } from '@nestjs/common';
import { AddressesModule } from '../addresses/addresses.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrdersModule } from '../orders/orders.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersReposistory } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersReposistory],
  imports: [PrismaModule, AddressesModule, OrdersModule, NotificationsModule],
})
export class UsersModule {}
