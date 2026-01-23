const request = require("supertest");
const app = require("../src/app.js");
const { resetDb } = require("../src/db/fakeDB.js");

/**
 * WHY beforeEach?
 * Each test must start clean.
 * No shared state.
 */
beforeEach(() => {
  resetDb();
});

describe("User API Tests", () => {

  /**
   * 1️⃣ AUTH TEST
   * WHY: Protected routes must never be open
   */
  test("POST /user/users fails without auth", async () => {
    const res = await request(app)
      .post("/user/users")
      .send({
        name: "Rohit",
        email: "rohit@test.com",
      });

    expect(res.statusCode).toBe(401);
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

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Name and email required");
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

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Rohit");
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

    expect(res.statusCode).toBe(409);
  });

});
