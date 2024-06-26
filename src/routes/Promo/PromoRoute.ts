import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import PromoController from '../../controllers/Promo/PromoController';

class PromoRoute {
  route: Router;
  promoController: PromoController;

  constructor(promoController: PromoController) {
    this.promoController = promoController;
    this.route = Router();
    this.registerRoute();
  }

  getAllPromosRoute() {
    return this.route.get(
      '/',
      authToken,
      // checkAdminAccees,
      this.promoController.getAllPromo,
    );
  }

  createPromo() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      this.promoController.createPromo,
    );
  }

  updatePromo() {
    return this.route.put(
      '/:promoId',
      authToken,
      checkAdminAccees,
      this.promoController.updatePromo,
    );
  }

  deletePromo() {
    return this.route.delete(
      '/:promoId',
      authToken,
      checkAdminAccees,
      this.promoController.deletePromo,
    );
  }

  getDetailPromo() {
    return this.route.get(
      '/:promoId',
      authToken,
      checkAdminAccees,
      this.promoController.getDetailPromo,
    );
  }

  registerRoute(): Router {
    this.getAllPromosRoute();
    this.getDetailPromo();
    this.createPromo();
    this.deletePromo();
    this.updatePromo();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default PromoRoute;
