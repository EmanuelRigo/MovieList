import { userMoviesController } from "../../controllers/userMovies.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class UserMoviesRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    // this.read("/",["PUBLIC"], userMoviesController.getAll)
    this.read("/:id", ["USER"], userMoviesController.getById);
    this.read("/", ["USER"], userMoviesController.getByToken);
    this.read(
      "/movies/:mid",
      ["USER"],
      userMoviesController.getByTokenAndMovie
    );
    this.update("/", ["USER"], userMoviesController.addMovie);
    this.update("/movies/:mid", ["USER"], userMoviesController.updateMovie);
    this.destroy("/movies/:mid", ["USER"], userMoviesController.removeMovie);
  };
}

const userMoviesRouter = new UserMoviesRouter();
export default userMoviesRouter.getRouter();
