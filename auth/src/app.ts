import express, { Application } from "express";
import cookieSession from "cookie-session";
import { errorHandler } from "@mcrosrvtickets/common";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
// import { NotFoundError } from "./errors/not-found-error";

const app: Application = express();
app.set("trust proxy", true); // Trust the first proxy

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // Use secure cookies in production
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

export { app };
