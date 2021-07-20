import express, { Application, Request, Response, NextFunction } from "express";
import Users from "../schemas/user";
import passportRouter from "passport";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";

const app = express();

const passportConfig = () => {
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    })
    
    passportRouter.deserializeUser((id: any, done) => {
        done(null, id);
    })
    
    passportRouter.use(new Strategy({
        clientID: "37960030053-8vripp96lrduls0q4rdmqd29b396q775.apps.googleusercontent.com",
        clientSecret: "mWqziZZlggEOzt35UMaG74kl",
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      async function(accessToken, refreshToken, profile, done) {
           const user = await Users.findOne({ id: profile.id });
    
           if (!user) {
               const id = profile.id;
               const email = profile.id;
               const nickname = profile.name.givenName;
    
               const user = await Users.create({ id, email, nickname });
           }
    
           return done(null, profile)
      }
    ));
}


export { passportConfig };