import 'express-async-errors';
import express from 'express';
import errorHandler from '../middlewares/errors/error-handler';
import router from '../routers/index';
import '../services/types';

const startExpressApp = async () => {

    const app = express();

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send( '<h1> Welcome to the auth-system API </h1>')
    })

    app.use(router);

    app.all('*', (_req, res) => {
        res.status(404).send('Unable to find the requested resource!');
    });

    app.use(errorHandler);

    return app;
};

export default startExpressApp;