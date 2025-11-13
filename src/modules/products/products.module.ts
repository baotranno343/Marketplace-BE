import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [PrismaModule],
})
export class ProductsModule {}
