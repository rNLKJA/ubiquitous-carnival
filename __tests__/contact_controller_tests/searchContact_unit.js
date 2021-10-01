// allow to send http request to our app
const mongoose = require('mongoose')

const contactController = require("../../controller/contactController")

const Contact = require("../../models/contactSchema")
const { User } = require("../../models/userSchema")

describe('unit test of synchronizationContactInfo form contactController.js with fillter', () => {
    const req = {
        user: {_id : '61503926028ce448aceda136'},
        body:{
        lastName:"Bin",
        firstName:"",
        phone:"",
        email:"",
        occupation:"",
        note:"",
        addDate:"",
        contactUserName: "",
        nofiller: false}
    }

    const res = {
        send: jest.fn(),
        json: jest.fn()
    }

    beforeAll(() => {
        res.send.mockClear();
        res.json.mockClear();

        Contact.find = jest.fn().mockResolvedValue([{
            email: [],
            phone:[],
            lastName: "Bin",
            firstName: "test",
            occupation: "test",
            __v:0
        }])
        
        Contact.find.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue([{
                email: [],
                phone:[],
                lastName: "Bin",
                firstName: "test",
                occupation: "test", 
                }]
            )
        }))

        contactController.searchContact(req, res)
    })

    test("Test case 1: basic search with last name in fillter mode", ()=>{
        expect(Contact.find).toHaveBeenCalledTimes(1);
        expect(Contact.find).toHaveBeenCalledWith({lastName:{$regex: new RegExp("Bin", 'i')}, ownerAccount:"61503926028ce448aceda136"})
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith([{
            email: [],
            phone:[],
            lastName: "Bin",
            firstName: "test",
            occupation: "test",
        }])
    })
})

//TODO: mutiple chain function call need to mock
describe('unit test of synchronizationContactInfo form contactController.js in basic mode without fillter', () => {
    // const req = {
    //     user: {_id : '61503926028ce448aceda136'},
    //     body:{
    //     searchContent: "Bin Liang 123979 aiueu",
    //     lastName:"Bin",
    //     firstName:"",
    //     phone:"",
    //     email:"",
    //     occupation:"",
    //     note:"",
    //     addDate:"",
    //     contactUserName: "",
    //     nofiller: true}
    // }

    // const res = {
    //     send: jest.fn(),
    //     json: jest.fn()
    // }

    // // jest.mock("models", ()=> {
    // //     return {
    // //         ContactList : jest.fn().mockImplementation(() => { return {} })
    // //     }
    // // });

    // beforeAll(() => {
    //     res.send.mockClear();
    //     res.json.mockClear();

    //     Contact.find = jest.fn().mockReturnValue([{
    //         email: [],
    //         phone:[],
    //         lastName: "Bin",
    //         firstName: "test",
    //         occupation: "test",
    //         __v:0
    //     }])
        
    //     // Contact.find.mockImplementation(() => ({
    //     //     lean: jest.fn().mockReturnValue([{
    //     //         email: [],
    //     //         phone:[],
    //     //         lastName: "Bin",
    //     //         firstName: "test",
    //     //         occupation: "test", 
    //     //         }]
    //     //     )
    //     // }))
    //     // .mockImplementationOnce(() => ({
    //     //     lean: jest.fn().mockReturnValue([{
    //     //         email: [],
    //     //         phone:[],
    //     //         lastName: "test",
    //     //         firstName: "Bin",
    //     //         occupation: "test", 
    //     //         }]
    //     //     )
    //     // }))

    //     contactController.searchContact(req, res)
    // })

    // test("Test case 1: basic search with last name in fillter mode", ()=>{
    //     expect(Contact.find).toHaveBeenCalledTimes(2);
    //     expect(res.json).toHaveBeenCalledTimes(1);
    //     expect(res.json).toHaveBeenCalledWith([{
    //         email: [],
    //         phone:[],
    //         lastName: "",
    //         firstName: "Liang",
    //         occupation: "test",
    //     }])
    // })
})

describe("Unit testing synchronizationContactInfo from contactController with fail database query", () => {
    const req = {
            user: {_id : '61503926028ce448aceda136'},
            body:{lastName:"Bin",
            firstName:"",
            phone:"",
            email:"",
            occupation:"",
            note:"",
            addDate:"",
            contactUserName: "",
            nofiller: false}
    }

    const res = {
        send: jest.fn(),
        json: jest.fn()
    }

    beforeAll(() => {

        res.send.mockClear();
        res.json.mockClear();

        Contact.find = jest.fn().mockResolvedValue();

        Contact.find.mockImplementation(() => {
            throw new Error();
        })

        contactController.searchContact(req, res)
    })

    test("test case 1: testing with database query failed, excepting error message", ()=>{
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith("search failed")
    })
})

