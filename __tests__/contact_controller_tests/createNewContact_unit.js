// allow to send http request to our app
const mongoose = require('mongoose')

const contactController = require("../../controller/contactController")

const Contact = require("../../models/contactSchema")
const { User } = require("../../models/userSchema")

describe('unit test of createNewContact form contactController.js', () => {
    const req = {
        user: {_id : '61388c3f914dcd011339fb6b'},
        body: {lastName: 'test', 
            firstName: 'test', 
            phone: ['123456789'], 
            email:['123412@123.com'],
            occcupation: 'student',
            }
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
        
        Date.now = jest.fn().mockResolvedValue('')
        
        User.findOne = jest.fn().mockImplementation((user)=> {if (user._id) {
            return {contactList: [],
            save: ()=>{}}}
            return null
        })
        
        Contact.findOne = jest.fn().mockResolvedValue(null)
        
        Contact.create = jest.fn().mockResolvedValue({lastName: 'test', 
        firstName: 'test', 
        phone: ['123456789'], 
        email:['123412@123.com'],
        occcupation: 'student',
        addDate: '',
        status:true,
        ownerAccount:'61388c3f914dcd011339fb6b',
        linkedAccount: null
        })

        contactController.createNewContact(req, res)
    })

    test("Test case 1: test with user create contact that didn't have an account", ()=>{
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({lastName: 'test', 
        firstName: 'test', 
        phone: ['123456789'], 
        email:['123412@123.com'],
        occcupation: 'student',
        addDate: '',
        status:true,
        ownerAccount:'61388c3f914dcd011339fb6b',
        linkedAccount: null
        })
    })
})

