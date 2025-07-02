import express, { Application } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
// import { NotFoundError } from "./errors/not-found-error";

const app: Application = express();
app.set("trust proxy", true); // Trust the first proxy

// Add this logging middleware FIRST
app.use((req, res, next) => {
  console.log(`🌐 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("📝 Body:", req.body);
  console.log("📋 Headers:", JSON.stringify(req.headers, null, 2));
  next();
});

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

const startDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!");
  });
};

startDB().catch((err) => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
