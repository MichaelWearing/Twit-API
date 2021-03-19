/* const expect = require("chai").expect; */
const request = require("supertest");
const app = require("../src/index");

describe("Tweet", () => {
  it("Post 2 Tweets > Correct GET response", (done) => {
    request(app)
      .put("/tweet?tweeter=supertest")
      .send({ tweet: "My First Tweet Test" })
      .expect(200, () => {
        request(app)
          .put("/tweet?tweeter=supertest")
          .send({ tweet: "My Second Tweet Test" })
          .expect(200, () => {
            request(app)
              .get("/tweet?tweeter=supertest")
              .expect(200)
              .expect(["My First Tweet Test", "My Second Tweet Test"], done);
          });
      });
  });
});
