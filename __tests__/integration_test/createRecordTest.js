// supertest allows us to send HTTP requests to our app
// install it: npm install supertest --save-dev
const request = require('supertest');
const app = require('../../app'); 


describe('Integration test: Test for create Record', () => {
    let agent = request.agent(app);

    // store the token
    let jwtToken = null;

    beforeAll(() => 
        agent
        .post('/user/login') 
        .set('Content-Type', 'application/json')
        .send({
            "userName": "test123",
            "password": "123"
        })
        .then(res => {
            jwtToken = res.body.token
        })
    );

    test('Test 1: Add a record with invalid contact_id', () => {
        return agent
            .post('/record/createRecord') 
            .set('Content-Type', 'application/json')
            .set('Authorization', jwtToken)
            .send({
                "contact_id": "123456",
                "dateTime": "2000/10/10",
                "location": "University of Melbourne",
                "notes": "the notes",
                "linkedAccount": null
            })
            .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('Database query failed');
            });
    });
      
    test('Test 2: Add a record without the meeting dateTime', () => {
        return agent
            .post('/record/createRecord') 
            .set('Content-Type', 'application/json')
            .set('Authorization', jwtToken)
            .send({
                "contact_id": "123456",
                "dateTime": null,
                "location": "University of Melbourne",
                "notes": "the notes",
                "linkedAccount": null
            })
            .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.dateTime).not.toBe(null);
            });
    });

});