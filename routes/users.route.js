import expressRouter from 'express';
import { login, sendVoucher, redeemVoucher } from '../controllers/users.controller.js';
const router = expressRouter.Router();

router.post('/login', login);
router.post('/sendVoucher', sendVoucher);
router.post('/redeemVoucher', redeemVoucher);

export default router;