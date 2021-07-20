// /auth/google

import express, { Application, Request, Response, NextFunction } from "express";
import passport from "passport";

const passportApp = express();

passportApp.get("/", 
    passport.authenticate("google", { scope: ["email", "profile"] })
);

// google login 성공과 실패 리다이렉트
passportApp.get("/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
)

export { passportApp };