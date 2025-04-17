import { userDao } from "../dao/mongo/user.dao.js";

class UserServices {
    async getAll() {
        const users = await userDao.getAll();
        return users;
    }

    async getById(id) {
        const user = await userDao.getById(id);
        return user;
    }

    async getByEmail(email) {
        const user = await userDao.getByEmail(email);
        return user;
    }

    async create(data) {
        const user = await userDao.create(data);
        return user;
    }

    async update(id, data) {
        const user = await userDao.update(id, data);
        return user;
    }

    async delete(id) {
        const deletedUser = await userDao.delete(id);
      
        if (!deletedUser) {
          throw new Error("El usuario no fue encontrado o ya fue eliminado.");
        }
      
        return {
          success: true,
          message: "Usuario eliminado correctamente.",
          data: deletedUser,
        };
      }
      
}

const userServices = new UserServices();
export default userServices;