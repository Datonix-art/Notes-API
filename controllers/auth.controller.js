import usersdb from '../databases/users.db.js';
import createError from '../utils/createError.js';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, comparePassword } from '../utils/hash.js'
// import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return next(createError(400, 'Please provide all fields'));
    const userExists = usersdb.find((user) => user.email === email);
    if(userExists) return next(createError(409, 'User already exists'));
    const newId = uuidv4();
    const isDuplicateId = usersdb.some((user) => user.id === newId);
    if(isDuplicateId) return next(createError(500, 'An error occured'));
    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: newId,
        name: name,
        email: email,
        password: hashedPassword
    }
    usersdb.push(newUser);

    req.session.isAuthenticated = false;
    req.session.user = newUser

    res.redirect('/auth/login');
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) return next(createError(400, 'Please provide all fields'))
    const user = usersdb.find((user) => user.email === email)
    if(!user) next(createError(500, 'User with such email does not exist'))
    const comparePasswords = await comparePassword(password, user.password)
    if(!comparePasswords) return next(createError(500, 'Password is not correct'))
    req.session.isAuthenticated = true
    res.redirect('/')
}

export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            return next(createError(500, 'Could not destroy session'))
        }
        res.redirect('/')
    })
}