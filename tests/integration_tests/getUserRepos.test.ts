import { app } from "../../index";
import request from "supertest";

describe("GET /users/:userid/repos", ()=> {
    it("should return 406 if accept : application/xml header value is provided", (done) => {
        request(app)
            .get("/users/devendra1102/repos")
            .set('Accept', 'application/xml')
            .expect(406)
            .then(response => {
                expect(response.body.message).toBe("Accept : 'application/xml' is not allowed in header");
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
                expect(response.body.message).toBe("Not Found");
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