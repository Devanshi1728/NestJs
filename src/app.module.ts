import { ProductModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017/eCommerce'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
