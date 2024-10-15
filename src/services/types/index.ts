import { Types } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: authpayload | any;
        }
    }
}

export interface UserType {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: string;
}

export interface authpayload {
    id: string | Types.ObjectId;
}

export { };