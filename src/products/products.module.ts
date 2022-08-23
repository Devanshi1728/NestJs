import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
