import Express from 'express';
import BodyParser from 'body-parser';

import UserRouter from './user.routes';
import DocumentationRouter from './documentation.routes';
import ErrorHandler from './ErrorHandler';

const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

server.use('/api/v1/users', UserRouter);
server.use('/api/v1/documentation', DocumentationRouter);

server.use(async (err, _, res, next) => {
  await ErrorHandler.handleError(err);

  res.status(err.httpCode).json(err.sanitize());
  next();
});

export default server;
