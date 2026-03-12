"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNoAuth = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { isLoggedIn } = req.signedCookies;
    if (!isLoggedIn) {
        res.status(301).redirect("/user/login");
        return;
    }
    next();
};
exports.checkAuth = checkAuth;
const checkNoAuth = (req, res, next) => {
    const { isLoggedIn } = req.signedCookies;
    if (isLoggedIn) {
        res.status(301).redirect("/user/profile");
        return;
    }
    next();
};
exports.checkNoAuth = checkNoAuth;
