import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../src/app.js";
import { resetDb } from "../src/db/fakeDB.js";

/**
 * WHY beforeEach?
 * Each test must start clean.
 * No shared state.
 */
test.beforeEach(() => {
  resetDb();
});

/**
 * 1️⃣ AUTH TEST
 * WHY: Protected routes must never be open
 */
test("POST /user/users fails without auth", async () => {
  const res = await request(app).post("/user/users").send({
    name: "Rohit",
    email: "rohit@test.com",
  });

  assert.strictEqual(res.statusCode, 401);
});

/**
 * 2️⃣ VALIDATION TEST
 * WHY: Bad input should fail early & clearly
 */
test("POST /users fails when data missing", async () => {
  const res = await request(app)
    .post("/user/users")
    .set("Authorization", "token")
    .send({ name: "Rohit" });

  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.body.error, "Name and email required");
});

/**
 * 3️⃣ HAPPY PATH
 * WHY: Core functionality must always work
 */
test("POST /users creates user", async () => {
  const res = await request(app)
    .post("/user/users")
    .set("Authorization", "token")
    .send({
      name: "Rohit",
      email: "rohit@test.com",
    });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.name, "Rohit");
});

/**
 * 4️⃣ EDGE CASE: DUPLICATE
 * WHY: Data integrity must be protected
 */
test("POST /user/users rejects duplicate email", async () => {
  await request(app)
    .post("/user/users")
    .set("Authorization", "token")
    .send({
      name: "Rohit",
      email: "rohit@test.com",
    });

  const res = await request(app)
    .post("/user/users")
    .set("Authorization", "token")
    .send({
      name: "Another",
      email: "rohit@test.com",
    });

  assert.strictEqual(res.statusCode, 409);
});
