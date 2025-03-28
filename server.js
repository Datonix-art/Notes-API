// imports
import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'node:path';
import session from 'express-session';
import errorHandler from './middleware/errorHandler.middleware.js';
import requestLogger from './middleware/logger.middleware.js';
import MongoStore from 'connect-mongo'; 

// environmental variables
dotenv.config();
const port = process.env.PORT;
const session_secret_key = process.env.SESSION_KEY
const mongo_uri = process.env.MONGO_URI

// express app instance
const app = express();

// session config
app.use(session({
    secret: session_secret_key,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        httpOnly: true,
        secure: false, 
    },
    store: MongoStore.create({
        mongoUrl: mongo_uri,
        collectionName: 'sessions',
    })
}))

// ejs config
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'))

// statis files
app.use(express.static(path.join(path.resolve(), 'public')))

// middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
// app.use(morgan('dev'))
app.use(requestLogger)

// routes
app.get('/', (req, res) => {
    res.render('home', { authenticated : req.session.isAuthenticated })
})

import notesRoutes from './routes/notes.routes.js';
app.use('/api/notes', notesRoutes)

import authRouter from './routes/auth.routes.js';
app.use('/auth', authRouter)

// error handling middleware
app.use(errorHandler)

app.listen(port, () => {console.log('Server is running')})

export default express;