import express, { Application } from "express";
import cookieSession from "cookie-session";
import { errorHandler } from "@mcrosrvtickets/common";

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

app.use(errorHandler);

export { app };
