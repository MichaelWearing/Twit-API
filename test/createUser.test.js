/* const expect = require("chai").expect; */
const request = require("supertest");
const app = require("../src/index");

describe("Create a User", () => {
  it("Create a new user", (done) => {
    request(app)
      .post("/createUser")
      .send({ username: "supertest" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("Username is taken", (done) => {
    request(app)
      .post("/createUser")
      .send({ username: "supertest" })
      .expect(/Username is already taken/, done);
  });
});
