import Express from 'express';
import BodyParser from 'body-parser';

import UserRouter from './user.routes.js';
import ErrorHandler from './ErrorHandler.js';

const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

server.use('/api/v1/users', UserRouter);

server.use(async (err, _, res, next) => {
  const handler = new ErrorHandler();
  await handler.handleError(err);

  res.status(err.httpCode).json(err.sanitize());
});

export default server;