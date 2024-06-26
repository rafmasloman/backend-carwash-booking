import prisma from '../../config/database';
import {
  IAuthLoginRequestType,
  IAuthRegisterRequestType,
} from '../../core/interfaces/auth/IAuthRequestInterface';
import { BcryptLibsUtil } from '../../utils/libs/BcryptLibs';
import { TokenLibsUtils } from '../../utils/libs/TokenLibs';

class AuthRepositoryImp {
  async login(payload: IAuthLoginRequestType) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        throw new Error('Email atau password salah');
      }

      const checkPassword = BcryptLibsUtil.compareBcrypt(
        payload.password,
        user?.password,
      );

      if (!checkPassword) {
        throw new Error('Email atau password salah');
      }

      const generateToken = TokenLibsUtils.signToken({
        payload: { id: user.id, role: user.role },
        secretKey: process.env.JWT_KEY as string,
      });

      return generateToken;
    } catch (error) {
      throw error;
    }
  }

  async register(payload: IAuthRegisterRequestType) {
    try {
      const hashPassword = await BcryptLibsUtil.hashBcrypt(payload.password);

      const user = await prisma.user.create({
        data: {
          email: payload.email,
          password: hashPassword,
          username: payload.username,
          customer: {
            create: {
              name: payload.customer.name,
              phoneNumber: payload.customer.phoneNumber,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const AuthRepository = new AuthRepositoryImp();
