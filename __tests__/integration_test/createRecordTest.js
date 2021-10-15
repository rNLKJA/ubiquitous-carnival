// supertest allows us to send HTTP requests to our app
// install it: npm install supertest --save-dev
const { ContextBuilder } = require("express-validator/src/context-builder");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

describe("Integration test: Test for create Record", () => {
  let agent = request.agent(app);

  // store the token
  let jwtToken = null;

  beforeAll(() =>
    agent
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send({
        userName: "test123",
        password: "123",
      })
      .then((res) => {
        jwtToken = res.body.token;
      })
  );

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });

  test("Test 1: Add a record with invalid contact_id", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: "123456885",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Database query failed");
      });
  });

  test("Test 2: Add a record without contact_id", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: null,
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Database query failed");
      });
  });

  test("Test 3: Add a record without the meeting dateTime", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: null,
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.meetingPerson).toBe("6131e5b0e0accb25d09663f6");
        expect(res.body.location).toBe("University of Melbourne");
        expect(res.body.dateTime).not.toBe(null);
        expect(res.body.lat).toBe(122334545);
        expect(res.body.lng).toBe(52123456);
        expect(res.body.notes).toBe("account");
      });
  });

  test("Test 4: Add a record with the meeting dateTime", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.meetingPerson).toBe("6131e5b0e0accb25d09663f6");
        expect(res.body.location).toBe("University of Melbourne");
        expect(res.body.dateTime).toBe("2021-10-01T10:28:10.018Z");
        expect(res.body.lat).toBe(122334545);
        expect(res.body.lng).toBe(52123456);
        expect(res.body.notes).toBe("account");
      });
  });
  

  /*
  test("Test 4: Add a record without the linkedAccount", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).not.toContain("Database query failed");
      });
  });*/

  /*
  test("Test 4: Add a record with a linkedAccount, but the linkedAccount is invalid", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Database query failed");
      });
  });*/

  /*
  test("Test 5: Add a record with a linkedAccount, and the linkedAccount is valid", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545",
            "lng": "52123456"
        },
        notes: "account"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).not.toContain("Database query failed");
      });
  });*/
  
});
