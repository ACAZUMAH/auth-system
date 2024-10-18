"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const index_1 = require("../../users/index");
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(async (user, done) => {
    const findUser = await (0, index_1.findGoogleUser)(user.id);
    return findUser ? done(null, findUser) : done(null, null);
});
exports.default = passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    scope: ['email', 'profile']
}, async (_accessToken, _refreshToken, profile, done) => {
    let user = await (0, index_1.findGoogleUser)(profile.id);
    if (user) {
        await (0, index_1.deleteUser)(user._id);
    }
    const data = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.email,
        phone: profile.phone
    };
    user = await (0, index_1.createGoogleUser)(data);
    return done(null, user);
}));
