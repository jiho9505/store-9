import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { env } from './src/config/env';
import apiRouter from './src/routes';

const port = env.server.port || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan(env.isDev ? 'dev' : 'combine'));

app.use('/api', apiRouter);

createConnection().then(() => {
  app.listen(port, () => console.log('Server run on:', port));
});
