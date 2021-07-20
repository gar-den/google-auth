import express, { Application, Request, Response, NextFunction } from "express";
import session from 'express-session';
import passport from "passport";
import { passportApp } from "./routers/google";
import { passportConfig } from "./routers/passport";
import { router } from "./routers/router";

import { connect } from "./schemas";
connect();

const app = express();

app.use(session({secret: "secret key", resave: false, saveUninitialized: false}));

// passport 초기화 및 session 연결
app.use(passport.initialize())
app.use(passport.session())

passportConfig();

app.use("/auth/google", [passportApp]);
app.use("/", [router]);

app.listen(5000, () => {
    console.log("listening at http://localhost:5000");
});