import { Router } from 'express';
import users from '@app/Users/controllers/UsersController'

const routes = Router();

routes.get('/users', users.index)

export default routes