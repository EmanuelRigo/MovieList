import CustomRouter from "../../utils/CustomRouter.util.js";
import { verifyTokenUtil } from "../../utils/token.util.js";
import passportCb from "../../middlewares/passportCb.middleware.js";
import { userController } from "../../controllers/users.controller.js";
import userMoviesServices from "../../services/userMovies.services.js";
import exp from "constants";
import passport from "passport";

class SessionRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    // Root route for sessions
    this.read("/", ["PUBLIC"], (req, res) => {
      res.send("¡Bienvenido a las sesiones de la API de MovieList!");
    });

    //REGISTER
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register", { session: false }),
      register
    );

    //LOGIN
    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login", { session: false }),
      login
    );

    //UPDATE-PASSWORD
    this.update(
      "/update-password",
      ["USER", "ADMIN"],
      passportCb("updatePassword", { session: false }),
      update
    );

    //UPDATE
    this.update(
      "/update",
      ["USER", "ADMIN"],
      passportCb("update", { session: false }),
      update
    );

    //SIGNOUT
    this.create(
      "/signout",
      ["USER", "ADMIN"],
      passportCb("signout", { session: false }),
      signout
    );

    //ONLINE
    this.create(
      "/online",
      ["USER", "ADMIN"],
      passportCb("online", { session: false }),
      onlineToken
    );

    this.destroy(
      "/delete",
      ["USER", "ADMIN"],
      passportCb("deleteAccount", { session: false }),
      deleteAccount
    );

    // GOOGLE
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    //GOOGLE-CB
    this.read(
      "/google/cb",
      ["PUBLIC"],
      passportCb("google", { session: false }),
      google
    );
  };
}

async function register(req, res) {
  try {
    const { _id } = req.user;
    const message = "User Registered";
    await userMoviesServices.create({
      user_id: _id,
      movies: [],
    });

    return res.json201(_id, message);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json500("Internal Server Error");
  }
}

async function login(req, res) {
  try {
    const token = req.token;
    const name = req.user.username;
    const mode = req.user.mode;
    const onlineUser = req.onlineUser;
    const optsToken = {
      maxAge: 60 * 60 * 24 * 7 * 30 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 30 * 1000), // 30 days
    };
    const optsOnlineToken = {
      maxAge: 60 * 60 * 24 * 7 * 30 * 1000,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 30 * 1000), // 30 days
    };
    const optsName = {
      maxAge: 60 * 60 * 24 * 7 * 30 * 1000,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 30 * 1000), // 30 days
    };
    const optsMode = {
      maxAge: 31536000 * 1000,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 31536000 * 1000), // 1 year
    };
    const message = "USER LOGGED IN";
    const response = "ok";

    return res
      .cookie("token", token, optsToken)
      .cookie("onlineUser", onlineUser, optsOnlineToken)
      .cookie("name", name, optsName)
      .cookie("mode", mode, optsMode)
      .json200(response, message);
  } catch (error) {
    console.error("Error during login:", error);
    return res.json500("Internal Server Error");
  }
}

async function update(req, res) {
  try {
    const message = "User Updated";
    const response = req.user.email;
    return res.json200(response, message);
  } catch (error) {
    console.error("Error during update:", error);
    return res.json500("Internal Server Error");
  }
}

async function deleteAccount(req, res) {
  for (const cookie in req.cookies) {
    res.clearCookie(cookie, { sameSite: "none", secure: true });
  }
  const message = "Account Deleted";
  return res.json200(req.user, "Account deleted");
}

function signout(req, res) {
  for (const cookie in req.cookies) {
    res.clearCookie(cookie, { sameSite: "none", secure: true });
  }
  return res
    .status(200)
    .json({ response: "OK", message: "Todas las cookies eliminadas" });
}

async function onlineToken(req, res, next) {
  console.log("🚀 ~ onlineToken ~ req:", req.user);
  const message = req.user.email.toUpperCase() + " IS ONLINE";
  const response = req.user;
  return res.json200(response, message);
}

async function google(req, res, next) {
  return res.status(200).json({ message: "USER LOGGED IN", token: req.token });
}

const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();
