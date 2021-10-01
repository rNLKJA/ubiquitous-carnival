// allow to send http request to our app
const mongoose = require('mongoose')

const contactController = require("../../controller/contactController")

const Contact = require("../../models/contactSchema")
const { User } = require("../../models/userSchema")

describe('unit test of deleteOneContact form contactController.js', () => {
    const req = {
        user: {_id : '61503926028ce448aceda136', userName:"test"},
        params:{contact_id : '615549ec49ed3c0016a6a18a'}
    }

    const res = {
        send: jest.fn(),
        json: jest.fn()
    }

    // jest.mock("models", ()=> {
    //     return {
    //         ContactList : jest.fn().mockImplementation(() => { return {} })
    //     }
    // });

    beforeAll(() => {
        res.send.mockClear();
        res.json.mockClear();
        
        User.findOne = jest.fn().mockResolvedValue({
            userName: "test", 
            email: [],
            phone:[],
            lastName: "test",
            firstName: "test",
            occupation: "test",
            contactList: [{contact: "test_id"}, {contact:"615549ec49ed3c0016a6a18a"}]
        })

        User.findOne.mockImplementationOnce(() => ({
                lean: jest.fn().mockReturnValue({
                email: [],
                phone:[],
                lastName: "test",
                firstName: "test",
                occupation: "test",
                contactList: [{contact: "test_id"}, {contact:"615549ec49ed3c0016a6a18a"}]
            })
        }))

        User.findOneAndUpdate = jest.fn().mockResolvedValue();
        Contact.deleteOne = jest.fn().mockResolvedValue();

        contactController.deleteOneContact(req, res)
    })

    test("Test case 1: give a contact Id, able to get the contact detail", ()=>{
        expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1)
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            {userName: "test"}, 
            {contactList: [{contact: "test_id"}]}
        )
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            status:"success"
        })
    })
})

describe("Unit testing deleteOneContact from contactController with invalid contact Id", () => {
    const req = {
        user: {_id : '61503926028ce448aceda136'},
        params:{contact_id : '1234567894', userName:"test"}
    }

    const res = {
        send: jest.fn(),
        json: jest.fn()
    }

    // jest.mock("models", ()=> {
    //     return {
    //         ContactList : jest.fn().mockImplementation(() => { return {} })
    //     }
    // });

    beforeAll(() => {
        res.send.mockClear();
        res.json.mockClear();
        
        User.findOne =jest.fn().mockResolvedValue();

        User.findOne.mockImplementationOnce(() => {
            throw new Error();
        });

        // User.findOneAndUpdate = jest.fn().mockResolvedValue();
        // Contact.deleteOne = jest.fn().mockResolvedValue();
        // Contact.deleteOne.mockImplementationOnce(() => {
        //     throw new Error();
        // });
        
        contactController.deleteOneContact(req, res)
    })

    test("test case 1: testing with fail dabase query, excepting error message", ()=>{
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ status: "failed" })
    })
})

