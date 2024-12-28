import { Router } from "express";
import { login, logout, register } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;