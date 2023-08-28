import { Router } from 'express';
import authRoutes from '@app/Auth/routes';
import UsersRoutes from '@app/Users/routes'

const routes = Router();

routes.use(authRoutes)
routes.use(UsersRoutes)

export default routes