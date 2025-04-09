interface EnvUtils {
  API_KEY: string | undefined; 
  BACKEND_URL: string | undefined;
  SECRET_KEY: string | undefined;
}

const envsUtils: EnvUtils = {
  API_KEY: process.env.API_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
  SECRET_KEY: process.env.SECRET_KEY
};

export default envsUtils;