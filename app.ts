import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';
import AuthRouter from './src/routes/Auth/AuthRoute';
import UserController from './src/controllers/User/UserController';
import UserRoute from './src/routes/User/UserRoute';
import UserServices from './src/service/User/UserService';
import CustomerService from './src/service/Customer/CustomerService';
import CustomerController from './src/controllers/Customer/CustomerController';
import CustomerRoute from './src/routes/Customer/CustomerRoute';
import cookieParser from 'cookie-parser';
import TimeslotService from './src/service/Timeslot/TimeslotService';
import TimeslotController from './src/controllers/Timeslot/TImeslotController';
import TimeslotRoute from './src/routes/Timeslot/TimeslotRoute';
import PromoService from './src/service/Promo/PromoService';
import PromoController from './src/controllers/Promo/PromoController';
import PromoRoute from './src/routes/Promo/PromoRoute';
import ProductService from './src/service/Product/ProductService';
import ProductController from './src/controllers/Product/ProductController';
import ProductRoute from './src/routes/Product/ProductRoute';
import BookingService from './src/service/Booking/BookingService';
import BookingController from './src/controllers/Booking/BookingController';
import BookingRoute from './src/routes/Booking/BookingRoute';
import AuthServices from './src/service/Auth/AuthService';
import AuthController from './src/controllers/Auth/AuthController';
import path from 'path';
import { ErrorHandler } from './src/middleware/ErrorMiddleware';
import PublicRoute from './src/routes/Public/PublicRoute';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// todo initialize Services
const AuthServiceInit = new AuthServices();
const UserServiceInit = new UserServices();
const CustomerServiceInit = new CustomerService();
const TimeslotServiceInit = new TimeslotService();
const PromoServiceInit = new PromoService();
const ProductServiceInit = new ProductService();
const BookingServiceInit = new BookingService();

// todo initialize Controller
const AuthControllerInit = new AuthController(AuthServiceInit, UserServiceInit);
const UserControllerInit = new UserController(UserServiceInit);
const CustomerControllerInit = new CustomerController(CustomerServiceInit);
const TimeslotControllerInit = new TimeslotController(TimeslotServiceInit);
const PromoControllerInit = new PromoController(PromoServiceInit);
const ProductControllerInit = new ProductController(ProductServiceInit);
const BookingControllerInit = new BookingController(BookingServiceInit);

// todo initialize Route
const AuthRoute = new AuthRouter(AuthControllerInit);
const UserRouteInit = new UserRoute(UserControllerInit);
const CustomerRouteInit = new CustomerRoute(CustomerControllerInit);
const TimelostRouteInit = new TimeslotRoute(TimeslotControllerInit);
const PromoRouteInit = new PromoRoute(PromoControllerInit);
const ProductRouteInit = new ProductRoute(ProductControllerInit);
const BookingRouteInit = new BookingRoute(BookingControllerInit);
const PublicRouteInit = new PublicRoute(ProductControllerInit);

app.use(cookieParser());

app.use(`${process.env.API_URL}/auth`, AuthRoute.getRouter());
app.use(`${process.env.API_URL}/users`, UserRouteInit.getRouter());
app.use(`${process.env.API_URL}/customer`, CustomerRouteInit.getRouter());
app.use(`${process.env.API_URL}/timeslot`, TimelostRouteInit.getRouter());
app.use(`${process.env.API_URL}/promo`, PromoRouteInit.getRouter());
app.use(`${process.env.API_URL}/product`, ProductRouteInit.getRouter());
app.use(`${process.env.API_URL}/booking`, BookingRouteInit.getRouter());
app.use(`${process.env.API_URL}/public`, PublicRouteInit.getRouter());

// error middleware
app.use(ErrorHandler);

const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
