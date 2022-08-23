import { ProductSchema } from './products.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
