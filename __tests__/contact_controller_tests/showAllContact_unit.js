// allow to send http request to our app
const mongoose = require('mongoose')

const contactController = require("../../controller/contactController")

const Contact = require("../../models/contactSchema")
const { User, ContactList } = require("../../models/userSchema")

describe('unit test of createNewContact form contactController.js', () => {
    const req = {
        user: {_id : '61503926028ce448aceda136'},
        body:{}
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
            contactList: {contact: "test_id"},
            populate: jest.fn().mockResolvedValue(this),
            lean:jest.fn().mockResolvedValue(this),
        })
        
        User.findOne.mockImplementationOnce(() => ({
            populate: jest.fn().mockReturnValue({
                userName: "test", 
                email: [],
                phone:[],
                lastName: "test",
                firstName: "test",
                occupation: "test",
                contactList: {contact: "replace"},
                __v: 0
            })
        })).mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                userName: "test", 
                email: [],
                phone:[],
                lastName: "test",
                firstName: "test",
                occupation: "test",
                contactList: {contact: "replace"},
            })
        }))

        // User.findOne.mockImplementation(() => ({
        //     lean: jest.fn().mockResolvedValue({
        //         userName: "test", 
        //         email: [],
        //         phone:[],
        //         lastName: "test",
        //         firstName: "test",
        //         occupation: "test",
        //         contactList: {contact: "test_id"},
        //     })
        // }))

        contactController.showAllContact(req, res)
    })

    test("Test case 1: test with user create contact that didn't have an account", ()=>{
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            contact: "replace"
        })
    })
})

