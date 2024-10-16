import { Router } from 'express';
import * as user from '../controllers/index';
import { verifyAccessToken } from '../helpers';

const router = Router();

router.post('/auth/register', user.Register);
router.post('/auth/verify', user.verifyOtp);
router.post('/auth/login', user.Login);
router.route('/assign-role/:id')
.post(verifyAccessToken, user.assignRole);
router.route('/profile')
.get(verifyAccessToken, user.getProfile)
.put(verifyAccessToken, user.updateProfile);
router.delete('/user/:id', verifyAccessToken, user.deleteUser);
router.get('/public-data', user.getUsers);

export default router;