import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

/**
 * catches all errors thrown in the application and sends a response
 * @param err errors object
 * @param _req Request object
 * @param res Response object
 * @param _next Next function
 * @returns error response
 */
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    if (err instanceof createHttpError.HttpError) {
       return res.status(err.statusCode).json({ error: [{ message: err.message }] });
    }
    return res.status(500).json({ error: [{ message: 'Internal server error' }] });
};

export default errorHandler;