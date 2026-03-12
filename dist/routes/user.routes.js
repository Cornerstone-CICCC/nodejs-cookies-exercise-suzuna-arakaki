"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
// in-memory database
const users = [{ id: 1, username: "admin", password: "admin12345" }];
const userRouter = (0, express_1.Router)();
// User Route
userRouter.get("/login", auth_middleware_1.checkNoAuth, (req, res) => {
    res.status(200).render("login");
});
userRouter.post("/login", auth_middleware_1.checkNoAuth, (req, res) => {
    const { username, password } = req.body;
    if (!username.trim() || !password.trim()) {
        res.status(400).json({ message: "Please fill username or password." });
        return;
    }
    const foundUser = users.find((user) => user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password);
    if (!foundUser) {
        res.status(500).json({ message: "User not found!" });
        return;
    }
    res.cookie("isLoggedIn", true, {
        maxAge: 10 * 60 * 1000,
        signed: true,
        httpOnly: true,
    });
    res.cookie("username", foundUser.username, {
        maxAge: 10 * 60 * 1000,
        signed: true,
        httpOnly: true,
    });
    res.status(301).redirect("/user/profile");
});
userRouter.get("/profile", auth_middleware_1.checkAuth, (req, res) => {
    const { username } = req.signedCookies;
    res.status(200).render("profile", {
        username,
    });
});
userRouter.get("/logout", (req, res) => {
    res.clearCookie("isLoggedIn");
    res.clearCookie("username");
    res.status(301).redirect("/user/login");
});
exports.default = userRouter;
