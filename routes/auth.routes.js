import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.get('/signup', (req, res) => {
    res.render('signup', { authenticated : req.session.isAuthenticated })
})

authRouter.get('/login', (req, res) => {
    res.render('login', { authenticated : req.session.isAuthenticated })
})

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.get('/logout', logout)

export default authRouter;