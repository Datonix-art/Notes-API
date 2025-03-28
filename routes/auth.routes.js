import  { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js'

const authRouter = Router();

authRouter.get('/signup', protectRoute, (req, res) => {
    res.render('signup', { authenticated : req.session.isAuthenticated })
})

authRouter.get('/login', protectRoute, (req, res) => {
    res.render('login', { authenticated : req.session.isAuthenticated })
})

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.get('/logout', logout)

export default authRouter;