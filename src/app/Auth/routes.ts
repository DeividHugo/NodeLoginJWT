import { Router } from 'express';
import auth from '@app/Auth/controllers/AuthController';
import AuthMiddleware from '@app/Auth/middlewares/AuthMiddleware';

const routes = Router();

routes.post('/auth/sign-in', auth.create)
routes.delete('/auth/sign-out', AuthMiddleware, auth.destroy)

export default routes