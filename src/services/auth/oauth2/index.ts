import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import {  createGoogleUser, deleteUser, findGoogleUser  } from '../../users/index'


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser( async (user: any, done) => {
    const findUser = await findGoogleUser(user.id);
    return findUser ? done(null, findUser) : done(null, null);
});

export default passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_REDIRECT_URI as string,
            scope: ['email','profile']
        }, async (_accessToken, _refreshToken, profile, done) => {
            let user = await findGoogleUser(profile.id);
            if(user){
                await deleteUser(user._id);
            }
            const data = {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.email,
                phone: profile.phone
            }
            user = await createGoogleUser(data);
            return done(null, user); 
        }
    )
)