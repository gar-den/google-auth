import express, { Application, Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
    if (!req.user) return res.redirect('/login');

    res.send(`
    <h1>Main page</h1>
    <a href="/logout">logout</a>
    `)
})

router.get("/login", (req, res) => {
    if (req.user) return res.redirect("/");

    res.send(`
    <form method="GET" action="/auth/google">
        <input id="google_login_btn" type="submit" name="">
    </form>
    `);
})

router.get("/logout", (req, res, next) => {
    req.logout()
    res.redirect("/login")
})

export { router };