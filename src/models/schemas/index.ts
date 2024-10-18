import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String , required: true},
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    is_authenticated: { type: Boolean, default: false },
}, { timestamps: true });

const authSchema = new Schema({
    code: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    expiresIn: { type: Date, default: Date.now() + 1 * 60 * 60000 },
});

const googleUserSchema = new Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: 'user' },
    is_authenticated: { type: Boolean, default: false },
},{ timestamps: true })

export const oauth = model('googleUser', googleUserSchema)
export const user = model('User', userSchema);
export const auth = model('Auth', authSchema);

  
