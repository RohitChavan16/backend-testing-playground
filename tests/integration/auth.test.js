import request from "supertest";
import app from "../../src/app.js";
import { resetDb } from "../../src/db/fakeDB.js";

beforeEach(() => resetDb());

describe("Auth API", () => {

  test("registers user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "a@test.com", password: "123" });

    expect(res.statusCode).toBe(201);
  });

  test("rejects duplicate register", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "a@test.com", password: "123" });

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "a@test.com", password: "123" });

    expect(res.statusCode).toBe(409);
  });

  test("login fails for unknown user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "x@test.com" });

    expect(res.statusCode).toBe(401);
  });

});
