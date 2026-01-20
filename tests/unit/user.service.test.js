import { createUser } from "../../src/services/user.service.js";
import { resetDb } from "../../src/db/fakeDB.js";

beforeEach(() => resetDb());

test("creates user", () => {
  const user = createUser({ email: "a@test.com", password: "123" });
  expect(user.email).toBe("a@test.com");
});

test("fails on duplicate user", () => {
  createUser({ email: "a@test.com", password: "123" });
  expect(() =>
    createUser({ email: "a@test.com", password: "123" })
  ).toThrow();
});
