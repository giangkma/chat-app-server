import express from 'express';
import authController from '../controllers/auth.controller';
import { isAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import authValidation from '../validations/auth.validation';

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);

router.post(
    '/register',
    // validate(authValidation.register),
    authController.register,
);

router.get('/get-profile', isAuth, authController.getProfile);

router.put('/update-profile', isAuth, authController.updateProfile);

router.put('/change-password', isAuth, authController.changePassword);

export default router;
