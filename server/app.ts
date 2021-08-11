import path from 'path';
import express from 'express';
import { createConnection } from 'typeorm';
import swagger from 'swagger-ui-express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import yamljs from 'yamljs';

import { env } from './src/config/env';
import apiRouter from './src/routes';

const port = env.server.port || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan(env.isDev ? 'dev' : 'combine'));

if (env.isDev) {
  const swaggerSpecs = yamljs.load(
    path.join(__dirname, 'dist', 'swagger.yaml')
  ) as swagger.SwaggerOptions;

  app.use('/api-docs', swagger.serve, swagger.setup(swaggerSpecs));
}

app.use('/api', apiRouter);

createConnection().then((conn) => {
  app.listen(port, () => console.log('Server run on:', port));
});
