const dotenv = require('dotenv');

const envFound = dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  if (envFound.error) throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  isPrd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  server: {
    port: Number(process.env.SERVER_PORT) || 4000,
    url: process.env.SERVER_URL,
  },
  client: {
    protocol: process.env.CLIENT_PROTOCOL,
    domain: process.env.CLIENT_DOMAIN,
    port: Number(process.env.CLIENT_PORT) || 3000,
    origin: process.env.CLIENT_ORIGIN,
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secrectAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET_NAME,
  },
  github: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  auth: {
    jwtKey: process.env.JWT_KEY,
    cookieSecret: process.env.COOKIE_SECRET,
  },
};
