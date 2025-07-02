import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

let mongo: MongoMemoryServer;

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = "testkey";
  process.env.NODE_ENV = "test"; // Set the environment to test
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie as string[];
};
