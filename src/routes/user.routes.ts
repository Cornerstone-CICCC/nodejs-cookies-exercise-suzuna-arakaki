import { Router, Request, Response } from "express";
import { User } from "../types/user.types";
import { checkAuth, checkNoAuth } from "../middleware/auth.middleware";

// in-memory database
const users: User[] = [{ id: 1, username: "admin", password: "admin12345" }];

const userRouter = Router();

// User Route
userRouter.get("/login", checkNoAuth, (req: Request, res: Response) => {
  res.status(200).render("login");
});

userRouter.post("/login", checkNoAuth, (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username.trim() || !password.trim()) {
    res.status(400).json({ message: "Please fill username or password." });
    return;
  }

  const foundUser = users.find(
    (user) =>
      user.username.toLowerCase() === username.toLowerCase() &&
      user.password === password,
  );

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

userRouter.get("/profile", checkAuth, (req: Request, res: Response) => {
  const { username } = req.signedCookies;
  res.status(200).render("profile", {
    username,
  });
});

userRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("username");
  res.status(301).redirect("/user/login");
});

export default userRouter;
