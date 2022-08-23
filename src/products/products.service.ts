import { Product } from './products.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModal: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    // const prodId = Math.random().toString();
    const newProduct = new this.productModal({
      title: title,
      description: desc,
      price: price,
    });
    const result = await newProduct.save();
    // this.products.push(newProduct);
    return result.id as string;
  }

  async getProducts() {
    const result = await this.productModal.find().exec();
    return result.map((i) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      price: i.price,
    }));
    // return [...this.products];
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) updatedProduct.title = title;
    if (desc) updatedProduct.description = desc;
    if (price) updatedProduct.price = price;
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const data = await this.productModal.findById(prodId);
    if (data) {
      await this.productModal.deleteOne({ _id: prodId }).exec();
    } else {
      throw new NotFoundException('Could not find the product');
    }
    // this.products.splice(index, 1);
  }

  private async findProduct(productId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModal.findById(productId);
    } catch (error) {
      throw new NotFoundException('Could not find thiss product');
    }
    if (!product) {
      throw new NotFoundException('Could not find this product');
    }
    return product;
  }
}
