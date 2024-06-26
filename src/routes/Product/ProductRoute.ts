import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import ProductController from '../../controllers/Product/ProductController';

class ProductRoute {
  route: Router;
  productController: ProductController;

  constructor(productController: ProductController) {
    this.productController = productController;
    this.route = Router();
    this.registerRoute();
  }

  getAllProductsRoute() {
    return this.route.get('/', authToken, this.productController.getAllProduct);
  }

  createProduct() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      this.productController.createProduct,
    );
  }

  getProductDetail() {
    return this.route.get(
      '/:productId',
      authToken,
      this.productController.getProductDetail,
    );
  }

  updateProduct() {
    return this.route.put(
      '/:productId',
      authToken,
      checkAdminAccees,
      this.productController.updateProduct,
    );
  }

  deleteProduct() {
    return this.route.delete(
      '/:productId',
      authToken,
      checkAdminAccees,
      this.productController.deleteProduct,
    );
  }

  registerRoute(): Router {
    this.getAllProductsRoute();
    this.getProductDetail();
    this.createProduct();
    this.deleteProduct();
    this.updateProduct();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default ProductRoute;
