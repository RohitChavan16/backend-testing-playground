const { createUser } = require("../../src/service/user.service.js");
const { resetDb } = require("../../src/db/fakeDB.js");

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
