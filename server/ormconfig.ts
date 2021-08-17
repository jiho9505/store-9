import { env } from './src/config/env';

const ormconfig = {
  type: 'mysql',
  host: env.db.host,
  port: env.db.port || 3306,
  username: env.db.user,
  password: env.db.password,
  database: env.db.database,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
