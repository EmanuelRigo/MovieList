import { movieController } from "../../controllers/movies.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class MovieRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["USER"], movieController.getAll);
    this.read("/:mid", ["USER"], movieController.getById);
    this.create("/", ["ADMIN", "USER"], movieController.create);
    this.update("/:mid", ["ADMIN"], movieController.update);
    this.destroy("/:mid", ["ADMIN"], movieController.deleteOne);
  };
}

let movieRouter = new MovieRouter();
export default movieRouter.getRouter();
