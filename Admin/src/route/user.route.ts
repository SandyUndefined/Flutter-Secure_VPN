import { Router } from 'express';
import UserController from '../controller/user.controller';
import isAdmin from '../middleware/admin';
import auth from '../middleware/auth';
import router from './vpn.route';

const route = Router();

const userController = new UserController();
route.post('/login', userController.login);
route.post('/register', isAdmin, userController.register);
router.get('/me', auth, userController.me);
router.get('/users', auth, userController.getAll);

export default route;
