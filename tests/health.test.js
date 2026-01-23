const request = require("supertest");
const app = require("../src/app.js");

describe("Basic Server Tests", () => {

  test("GET / should return Jai Shri Ram", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("JAI SHRI RAM");
  });

  test("GET /health/checkHealth returns OK", async () => {
    const res = await request(app).get("/health/checkHealth");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });

});
