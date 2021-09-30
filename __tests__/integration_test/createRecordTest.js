// supertest allows us to send HTTP requests to our app
// install it: npm install supertest --save-dev
const request = require('supertest');
const app = require('../../app'); 

describe('Integration test: Test for create Record', () => {
    let agent = request.agent(app);

    // store the token
    let jwtToken = null;

    beforeAll(() => agent
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

    /*
    // Test Case 2: Food ID = 1234 (Food = DOES NOT EXIST)
    // look up food with INVALID object ID
    test('Test 2 (lookup INVALID food): ??? (1234)', () => {
        return agent
          // send a request to app on the route /food/:id
          // with id = 1234
          .get('/foods/1234')
          .set('Cookie', cookie)
          .then((response) => {
            // HTTP response code should be OK/200 
            expect(response.statusCode).toBe(200);
            // FoodBuddy App will return a page, so expect html  
            //expect(response.type).toBe('text/html');
            // we expect the server to respond with the message:
            // Error: Food not found!  
            expect(response.text).toContain('Error: Food not found!');
          });
      });
*/
      

});