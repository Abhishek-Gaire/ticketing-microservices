import express, {Application} from "express";

import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signupRouter} from "./routes/signup";
import {signoutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handler";

const app: Application = express();

// Add this logging middleware FIRST
app.use((req, res, next) => {
  console.log(`🌐 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("📝 Body:", req.body);
  console.log("📋 Headers:", JSON.stringify(req.headers, null, 2));
  next();
});

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!");
});