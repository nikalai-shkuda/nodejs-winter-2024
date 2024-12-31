import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { ENV_PATH } from './common/constants';

config({ path: ENV_PATH });

export const DB_CONNECTION_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  logging: true,
  synchronize: false,
};
