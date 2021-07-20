import express, { Application, Request, Response, NextFunction } from "express";
import Users from "../schemas/user";
import passportRouter from "passport";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";

const app = express();

const passportConfig = () => {
    // 로그인 최초 성공시 호출되는 함수
    // done(null, user)로 세션 초기화
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    })
    
    // 사용자가 페이지를 방문할 때마다 호출되는 함수
    // done(null, user)로 사용자의 정보를 각 req.user에 넣어준다.
    passportRouter.deserializeUser((user: any, done) => {
        done(null, user);
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