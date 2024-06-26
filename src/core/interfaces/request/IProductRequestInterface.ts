import { ProductType } from '@prisma/client';

export interface IProductRequestParamsType {
  productName: ProductType;
  price: number;
}

export interface IProductRequestParamsRelationType {
  id: number;
  productName: ProductType;
  price: number;
}
