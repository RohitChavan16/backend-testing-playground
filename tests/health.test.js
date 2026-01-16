import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns OK", async () => {
  const res = await request(app).get("/health");

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.status, "OK");
});
