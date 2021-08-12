import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config();
  if (envFound.error) throw new Error("Couldn't find .env file");
}

export const env = {
  isDev: process.env.NODE_ENV === 'development',
  server: {
    port: Number(process.env.SERVER_PORT) || 4000,
    url: process.env.SERVER_URL,
  },
  client: {
    protocol: process.env.CLIENT_PROTOCOL,
    domain: process.env.CLIENT_DOMAIN,
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
};
