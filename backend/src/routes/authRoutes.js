import express from 'express';
import { register, login, logout, getCurrentUser, getAllUsers } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getcurrentuser', auth, getCurrentUser); 
router.get('/getAllUsers', auth, getAllUsers); // Admin endpoint to get all users

export default router;