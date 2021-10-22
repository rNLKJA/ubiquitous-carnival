// supertest allows us to send HTTP requests to our app
// install it: npm install supertest --save-dev
const { ContextBuilder } = require("express-validator/src/context-builder");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

describe("Integration test: Test for edit Record", () => {
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

  test("Test 1: Edit a record without a user's _id", () => {
    return agent
      .post("/record/editRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: null, 
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Peking",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Miss Important Information Input");
      });
  });

  test("Test 2: Edit a record with invalid user's _id", () => {
    return agent
      .post("/record/editRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "123456", 
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Peking",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Database query failed");
      });
  });

  test("Test 3: Edit a record with invalid contact_id", () => {
    return agent
      .post("/record/editRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "61695204687a7c05e401666e", 
        contact_id: "1234567",
        location: "University of Peking",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Database query failed");
      });
  });

  test("Test 4: Edit a record without contact_id", () => {
    return agent
      .post("/record/editRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "61695204687a7c05e401666e", 
        contact_id: null,
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
    })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Miss Important Information Input");
      });
  });

  test("Test 5: Edit a record without the meeting dateTime", () => {
    return agent
      .post("/record/editRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "61695204687a7c05e401666e", 
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: null,
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.meetingPerson).toBe("6131e5b0e0accb25d09663f6");
        expect(res.body.location).toBe("University of Melbourne");
        expect(res.body.dateTime).not.toBe(null);
        expect(res.body.lat).toBe(122334545);
        expect(res.body.lng).toBe(52123456);
        expect(res.body.notes).toBe("account");
        expect(res.body.customField).toEqual(expect.arrayContaining(["testCustomField"]));
      });
  });

  test("Test 6: Edit a record with the meeting dateTime", () => {
    return agent
      .post("/record/editRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "61695204687a7c05e401666e", 
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.meetingPerson).toBe("6131e5b0e0accb25d09663f6");
        expect(res.body.location).toBe("University of Melbourne");
        expect(res.body.dateTime).toBe("2021-10-01T10:28:10.018Z");
        expect(res.body.lat).toBe(122334545);
        expect(res.body.lng).toBe(52123456);
        expect(res.body.notes).toBe("account");
        expect(res.body.customField).toEqual(expect.arrayContaining(["testCustomField"]));
      });
  });

  test("Test 7: Edit a record without a geoCoords", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "61695204687a7c05e401666e", 
        contact_id: "6131e5b0e0accb25d09663f6",
        location: "University of Melbourne",
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: null,
        notes: "account",
        customField: "testCustomField"
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.meetingPerson).toBe("6131e5b0e0accb25d09663f6");
        expect(res.body.location).toBe("University of Melbourne");
        expect(res.body.dateTime).toBe("2021-10-01T10:28:10.018Z");
        expect(res.body.lat).toBe(null);
        expect(res.body.lng).toBe(null);
        expect(res.body.notes).toBe("account");
        expect(res.body.customField).toEqual(expect.arrayContaining(["testCustomField"]));
      });
  });

  test("Test 8: Edit a record without a location", () => {
    return agent
      .post("/record/createRecord")
      .set("Content-Type", "application/json")
      .set("Authorization", jwtToken)
      .send({
        _id: "61695204687a7c05e401666e", 
        contact_id: "6131e5b0e0accb25d09663f6",
        location: null,
        dateTime: "2021-10-01T10:28:10.018Z",
        geoCoords: {
            "lat": "122334545", 
            "lng":"52123456"
        },
        notes: "account",
        customField: "testCustomField"
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Miss Important Information Input");
      });
  });
});