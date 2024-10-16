import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

export default passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "http://localhost:3500/auth/redirect/google",
            scope: ['email','profile']
        }, async (accessToken, refreshToken, profile, done) => {
            
        }
    )
)