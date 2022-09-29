import { app } from "../../index";
import request from "supertest";

describe("GET /users/:userid/repos", ()=> {
    it("should return 406 if accept header is not passed", (done) => {
         request(app)
            .get("/users/devendra1102/repos")
            .expect(406)
            .then(response => {
                expect(response.body.message).toBe("accept : 'application/json' is missing in header");
                done();
            });

    });

    it("should return 406 if accept header value is not correct", (done) => {
        request(app)
            .get("/users/devendra1102/repos")
            .set('Accept', 'application/xml')
            .expect(406)
            .then(response => {
                expect(response.body.message).toBe("Only accept : 'application/json' is allowed in header");
                done();
            });;
    });

    it("should return 404 if invalid userid is passed", (done) => {
        request(app)
            .get("/users/someinvalidrandomuser/repos")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                expect(response.body.message).toBe("Request failed with status code 404");
                done();
            });

    });

    it("should return valid repos of a user if valid userid is passed", (done) => {
        request(app)
            .get("/users/devendra1102/repos")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => done());
    });

});