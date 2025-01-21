import { config } from 'dotenv';

const ENV_PATH: string = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

config({ path: ENV_PATH });

export const appConstants = {
  ENV_PATH,
  PORT: process.env.PORT || 4000,
} as const;

export const dbConstants = {
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
} as const;

export const jwtConstants = {
  ACCESS_SECRET: process.env.JWT_SECRET_KEY || 'home-library-secret-access',
  ACCESS_EXPIRES_IN: process.env.TOKEN_EXPIRE_TIME || '1h',
  REFRESH_SECRET:
    process.env.JWT_SECRET_REFRESH_KEY || 'home-library-secret-refresh',
  REFRESH_EXPIRES_IN: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
  CRYPT_SALT: Number(process.env.CRYPT_SALT || 5),
} as const;

export const logsConstants = {
  LOG_LEVEL: Number(process.env.LOG_LEVEL || 4),
  LOG_MAX_SIZE_KB: Number(process.env.LOG_MAX_SIZE_KB || 100),
} as const;
