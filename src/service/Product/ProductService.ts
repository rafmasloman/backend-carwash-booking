import prisma from '../../config/database';
import { IProductRequestParamsType } from '../../core/interfaces/request/IProductRequestInterface';
import CustomError from '../../utils/common/CustomError';

class ProductService {
  async getAllProduct() {
    try {
      const products = await prisma.product.findMany();

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductDetail(productId: string) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          id: Number(productId),
        },
      });

      if (!product) {
        throw new CustomError('Product tidak ditemukan', 404);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(payload: IProductRequestParamsType) {
    try {
      const product = await prisma.product.create({
        data: {
          price: payload.price,
          productName: payload.productName,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId: number, payload: IProductRequestParamsType) {
    try {
      const product = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          price: payload.price,
          productName: payload.productName,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await prisma.product.delete({
        where: {
          id: productId,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
