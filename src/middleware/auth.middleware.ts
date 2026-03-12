import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { isLoggedIn } = req.signedCookies;
  if (!isLoggedIn) {
    res.status(301).redirect("/user/login");
    return;
  }
  next();
};

export const checkNoAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { isLoggedIn } = req.signedCookies;
  if (isLoggedIn) {
    res.status(301).redirect("/user/profile");
    return;
  }
  next();
};
