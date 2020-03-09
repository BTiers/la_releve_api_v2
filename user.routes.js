import Express from 'express';

import UserValidation from './user.validation';
import UserController from './user.controller';

const router = Express.Router();

/* GET */

router.get('/', UserValidation.getAll, UserController.getAll);
router.get('/:id', UserValidation.getOne, UserController.getOne);

/* POST */

router.post('/', UserValidation.post, UserController.post);

/* PUT */

router.put('/:id', UserValidation.put, UserController.put);

/* PATCH */

router.patch('/:id', UserValidation.patch, UserController.patch);

/* DELETE */

router.delete('/:id', UserValidation.delete, UserController.delete);

export default router;
