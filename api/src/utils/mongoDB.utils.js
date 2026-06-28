import mongoose from "mongoose";
import envsUtils from "./envs.utils.js";

class MongoSingleton {
  static #instance;

  static async getInstance() {
    if (!MongoSingleton.#instance) {
      try {
        console.log("Mongo link:", envsUtils.MONGO_LINK);

        await mongoose.connect(envsUtils.MONGO_LINK);

        MongoSingleton.#instance = mongoose.connection;

        console.log("Conexión a MongoDB establecida");
      } catch (error) {
        console.error("Error conectando MongoDB:", error);

        throw error;
      }
    } else {
      console.log("Conexión a MongoDB ya está establecida");
    }

    return MongoSingleton.#instance;
  }
}

export default MongoSingleton;
