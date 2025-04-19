import moviesRouter from "./movies.router.js";
import sessionRouter from "./session.router.js";
import CustomRouter from "../../utils/CustomRouter.util.js";
import cookiesRouter from "./cookie.router.js";
import userMoviesRouter from "./userMovies.router.js";
import usersRouter from "./users.router.js";

class IndexRouter extends CustomRouter {
  constructor() {
    super();
    console.log("IndexRouter: Inicializando rutas principales...");
    this.init();
  }

  init = () => {
    this.use("/movies", ["USER"], moviesRouter);
    this.use("/sessions", ["PUBLIC"], sessionRouter);
    this.use("/users", ["USER", "ADMIN"], usersRouter);
    this.use("/cookies", ["USER"], cookiesRouter);
    this.use("/usermovies", ["USER"], userMoviesRouter);
    console.log("IndexRouter: Rutas configuradas correctamente.");
  };
}

let indexRouter = new IndexRouter();
export default indexRouter.getRouter();
