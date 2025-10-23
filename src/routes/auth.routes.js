import express from 'express';
const router = express.Router();
import * as AuthCtrl from '../controllers/auth.controller.js'; 

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);

export default router; 
