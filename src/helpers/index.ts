import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from 'jsonwebtoken';
import { authpayload } from '../services/types';
import { NextFunction, Request, Response } from 'express';


export const hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

export const comparePassword = async (password: string, hash: string) => {
    return await compare(password, hash)
}

export const genAccessToken = async (data: authpayload) => {
    const payload = { id: data.id };
    return sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET!, 
        { expiresIn: '1d' }
    );
};

export const verifyAccessToken = async (req:Request, res:Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if(!token){
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    };
    verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if(err){
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        req.user = user;
        next();
    });
}