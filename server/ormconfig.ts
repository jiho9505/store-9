import { ConnectionOptions } from 'typeorm';
import { env } from './src/config/env';

const ormconfig: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: env.db.host,
  port: Number(env.db.port) || 3306,
  username: env.db.user,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
  charset: 'utf8',
  logger: 'advanced-console',
};

export default ormconfig;
