import * as controller from '../controllers/authController.js'
import asyncRoute from './asyncRoute.js';
import express from 'express'

const router = express.Router();

router.post('/register', asyncRoute(controller.register));
router.post('/login', asyncRoute(controller.login));

export default router;