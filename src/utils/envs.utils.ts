import 'dotenv/config';

interface EnvUtils {
  API_KEY: string | undefined; 
}

const envsUtils: EnvUtils = {
  API_KEY: process.env.API_KEY,
};

export default envsUtils;