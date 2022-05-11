
import supertest from "supertest";
import should from "should";



var server = supertest.agent("http://localhost:5000");

describe("SAMPLE unit test", function () {
  // #1 should return home page
  it("should return home page", function (done) {
    // calling home page
    server
      .get("/")
      .expect("Content-type", /text/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });
});

describe("SAMPLE unit test", function () {
  // #1 should return home page
  it("routes check", function (done) {
    // calling home page
    server
      .get("/hello")
      .expect("Content-type", /text/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });
});
