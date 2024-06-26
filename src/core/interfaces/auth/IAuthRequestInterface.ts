import { ICustomerRequestInterface } from '../request/ICustomerRequestInterface';

export interface IAuthLoginRequestType {
  email: string;
  password: string;
}

export interface IAuthRegisterRequestType {
  email: string;
  password: string;
  username: string;
  customer: ICustomerRequestInterface;
}
