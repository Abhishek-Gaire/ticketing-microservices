import request from "supertest";
import { app } from "../../app";

it("can sign out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password1",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  const cookie = response.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Expected cookie but got undefined.");
  }
  console.log("Cookie:", cookie);
  expect(cookie[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
