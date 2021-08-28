const env = require('./config/env');

const ormconfig = {
  name: 'default',
  type: 'mysql',

  host: env.db.host,
  port: Number(env.db.port) || 3306,
  username: env.db.user,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  logging: true,
  entities: env.isDev ? ['src/entities/**/*.ts'] : ['dist/server/src/entities/**/*'],
  migrations: env.isDev ? ['src/migrations/**/*.ts'] : ['dist/server/src/migrations/**/*'],
  cli: {
    entitiesDir: env.isDev ? 'src/entities' : 'dist/server/src/entities',
    migrationsDir: env.isDev ? 'src/migrations' : 'dist/server/src/migrations',
  },
  charset: 'utf8',
  logger: 'advanced-console',
};

module.exports = ormconfig;
