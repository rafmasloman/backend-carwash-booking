import prisma from '../../config/database';
import { IUserRequestInterface } from '../../core/interfaces/request/IUserRequestInterface';
import { BcryptLibsUtil } from '../../utils/libs/BcryptLibs';

class UserServices {
  constructor() {
    console.log('UserServices initialized');
  }

  async getAllUsers(pagination?: { skip: number; take: number }) {
    try {
      const users = await prisma.user.findMany({
        // where: {
        //   role: 'CUSTOMER',
        // },
        skip: pagination?.skip,
        take: pagination?.take,
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  // async getAdminDetail(userId: string) {

  // }

  async getUserDetail(userId: string) {
    try {
      const users = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser(payload: IUserRequestInterface) {
    try {
      const hashPassword = await BcryptLibsUtil.hashBcrypt(payload.password);

      const user = await prisma.user.create({
        data: {
          email: payload.email,
          password: hashPassword,
          username: payload.username,
          role: 'CUSTOMER',
          customer: {
            create: {
              name: payload.customer.name,
              phoneNumber: payload.customer.phoneNumber,
            },
          },
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string) {
    console.log('user id : ', userId);

    try {
      const findUser = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!findUser) {
        throw new Error('User tidak ditemukan');
      }

      const user = await prisma.user.delete({
        where: {
          id: findUser.id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, payload: IUserRequestInterface) {
    console.log('user id : ', userId);

    try {
      const hashPassword = await BcryptLibsUtil.hashBcrypt(payload.password);

      const findUser = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!findUser) {
        throw new Error('User tidak ditemukan');
      }

      const user = await prisma.user.update({
        where: {
          id: findUser.id,
        },
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

  async changeProfilePicture(userId: string, profilePicture: string) {
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profilePicture,
        },
        select: {
          profilePicture: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfilePicture(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          profilePicture: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserServices;
