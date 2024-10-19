import 'express-async-errors';
import express from 'express';
import session from 'express-session';
import errorHandler from '../middlewares/errors/error-handler';
import setUpSwagger from '../docs/swagger';
import router from '../routers/index';
import '../services/types';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import helmet from 'helmet';
import cors from 'cors';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const startExpressApp = async () => {
    const app = express();
    app.use(express.json());
    app.use(session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());
    app.use(helmet());
    app.use(xss());
    app.use(limiter);
    app.get('/', (req, res) => {
        res.send( 
            '<h1> Welcome to the auth-system API </h1><a href="/api-docs">API Documentation</a>')
    })
    app.use(router);
    setUpSwagger(app);
    app.all('*', (_req, res) => {
        res.status(404).send('Unable to find the requested resource!');
    });
    app.use(errorHandler);
    return app;
};

export default startExpressApp;