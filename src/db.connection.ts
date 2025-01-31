import { DataSourceOptions } from 'typeorm';
import { dbConstants } from './common/config';

export const DB_CONNECTION_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  database: dbConstants.POSTGRES_DB,
  host: dbConstants.POSTGRES_HOST,
  password: dbConstants.POSTGRES_PASSWORD,
  port: Number(dbConstants.POSTGRES_PORT),
  username: dbConstants.POSTGRES_USER,
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  logging: true,
  synchronize: false,
};
