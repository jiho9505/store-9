import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import env from './config/env';
import apiRouter from './src/routes';
import origins from './config/origins';

const port = env.server.port || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.auth.cookieSecret));
app.use(express.static('public'));
app.use(cors({ credentials: true, origin: origins.dev }));
app.use(morgan(env.isDev ? 'dev' : 'combine'));

app.use('/api', apiRouter);

createConnection().then(() => {
  app.listen(port, () => console.log('Server run on:', port));
});

export { app };
