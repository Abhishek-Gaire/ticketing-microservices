import mongoose from "mongoose";

import { app } from "./app";

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
