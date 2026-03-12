import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";
import pageRouter from "./routes/page.routes";
import userRouter from "./routes/user.routes";

// create server
const app = express();

// Middleware
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set default engine
app.set("view engine", "EJS");
app.set("views", path.join(__dirname, "../src/views"));

// Routes
app.use("/", pageRouter);
app.use("/user", userRouter);

// fallback
app.use((req, res, next) => {
  res.status(404).send("Sorry, this is an invalid route");
});

// start server
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("Missing port!");
}
app.listen(PORT, () => {
  console.log(`Server is tunning on http://localhost:${PORT}`);
});
