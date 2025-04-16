import { userController } from "../../controllers/users.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class UserRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["ADMIN"], userController.getAll);
    this.create("/", ["PUBLIC"], userController.create);
    this.update("/:id", ["PUBLIC"], userController.update);
    this.destroy("/:id", ["USER", "ADMIN"], userController.deleteOne);
  };
}

const userRouter = new UserRouter()
// export default userController.getRouter()
export default userRouter.getRouter()