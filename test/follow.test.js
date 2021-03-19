/* const expect = require("chai").expect; */
const request = require("supertest");
const app = require("../src/index");

describe("Follow", () => {
  it("Checks for matching followers", (done) => {
    request(app)
      .get("/follow?username=Mikey")
      .send({ username: "Mikey" })
      .expect(200)
      .expect(["Ste", "Bob"], done);
  });

  it("No followers message", (done) => {
    request(app)
      .get("/follow?username=notAUser")
      .send({ username: "notAUser" })
      .expect(200)
      .expect(/No followers for that user/, done);
  });

  it("Should follow and then unfollow", (done) => {
    request(app)
      .put("/follow?toBeFollowed=supertest")
      .send({ follower: "Mikey" })
      .expect(200, () => {
        request(app)
          .put("/follow?toBeFollowed=supertest")
          .send({ follower: "Ste" })
          .expect(200, () => {
            request(app)
              .put("/follow?toBeFollowed=supertest")
              .send({ follower: "Ste" })
              .expect(200, () => {
                request(app)
                  .get("/follow?username=supertest")
                  .expect(["Mikey"], done);
              });
          });
      });
  });
});
