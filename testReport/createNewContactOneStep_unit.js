const mongoose = require("mongoose");
const Contact = require("../../models/contactSchema");
const Record = require("../../models/recordSchema");
const { User } = require("../../models/userSchema");

const contactController = require("../../controller/contactController");

describe("unit test of createNewContactOneStep form contactController.js with portrait", () => {
  const req = {
    user: { _id: "61503926028ce448aceda136" },
    body: {
      lastName: "test",
      firstName: "test",
      phone: ["123456789"],
      email: ["123412@123.com"],
      occupation: "student",
    },
  };

  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  // jest.mock("models", ()=> {
  //     return {
  //         ContactList : jest.fn().mockImplementation(() => { return {} })
  //     }
  // });

  beforeAll(() => {
    res.send.mockClear();
    res.json.mockClear();

    Date.now = jest.fn().mockResolvedValue("");

    contactController.createContactDocumentationOneStep = jest
      .fn()
      .mockResolvedValue({
        status: true,
        newContact: {
          _id: "615454b320f2bc5738d53e1b",
          lastName: "test",
          firstName: "test",
          phone: ["123456789"],
          email: ["123412@123.com"],
          occupation: "student",
          ownerAccount: "61388c3f914dcd011339fb6b",
        },
      });

    contactController.createContactPhotoUpload = jest.fn().mockResolvedValue({
      status: true,
      contact: {
        _id: "615454b320f2bc5738d53e1b",
        lastName: "test",
        firstName: "test",
        phone: ["123456789"],
        email: ["123412@123.com"],
        occupation: "student",
        portrait: {
          data: "1234",
          contentTypr: "imgae/jpg",
        },
        addDate: "",
        status: true,
        ownerAccount: "61388c3f914dcd011339fb6b",
      },
    });
    contactController.createContactOneStep(req, res);
  });

  test("Test case 1: test with user create contact that didn't have an account", () => {
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      newContact: {
        _id: "615454b320f2bc5738d53e1b",
        lastName: "test",
        firstName: "test",
        phone: ["123456789"],
        email: ["123412@123.com"],
        occupation: "student",
        portrait: {
          data: "1234",
          contentTypr: "imgae/jpg",
        },
        addDate: "",
        status: true,
        ownerAccount: "61388c3f914dcd011339fb6b",
      },
      contactId: "615454b320f2bc5738d53e1b",
    });
  });
});

// describe("unit test of createNewContactOneStep form contactController.js without portrait", () => {
//   const req = {
//     user: { _id: "61503926028ce448aceda136" },
//     body: {
//       lastName: "test",
//       firstName: "test",
//       phone: ["123456789"],
//       email: ["123412@123.com"],
//       occupation: "student",
//     },
//   };

//   const res = {
//     send: jest.fn(),
//     json: jest.fn(),
//   };

//   // jest.mock("models", ()=> {
//   //     return {
//   //         ContactList : jest.fn().mockImplementation(() => { return {} })
//   //     }
//   // });

//   beforeAll(() => {
//     res.send.mockClear();
//     res.json.mockClear();

//     Date.now = jest.fn().mockResolvedValue("");

//     createContactDocumentationOneStep = jest.fn().mockReturnValue({
//       status: true,
//       newContact: {
//         _id: "615454b320f2bc5738d53e1b",
//         lastName: "test",
//         firstName: "test",
//         phone: ["123456789"],
//         email: ["123412@123.com"],
//         occupation: "student",
//         addDate: "",
//         status: true,
//         ownerAccount: "61388c3f914dcd011339fb6b",
//       },
//     });

//     createContactPhotoUpload = jest.fn().mockReturnValue({
//       status: false,
//     });
//     contactController.createContactOneStep(req, res);
//   });

//   test("Test case 1: test with user create contact that didn't have an account", () => {
//     expect(res.json).toHaveBeenCalledTimes(1);
//     expect(res.json).toHaveBeenCalledWith({
//       status: true,
//       msg: "create without image",
//       contactId: "615454b320f2bc5738d53e1b",
//     });
//   });
// });

// describe("unit test of createNewContactOneStep form contactController.js that duplicate", () => {
//   const req = {
//     user: { _id: "61503926028ce448aceda136" },
//     body: {
//       lastName: "test",
//       firstName: "test",
//       phone: ["123456789"],
//       email: ["123412@123.com"],
//       occupation: "student",
//     },
//   };

//   const res = {
//     send: jest.fn(),
//     json: jest.fn(),
//   };

//   // jest.mock("models", ()=> {
//   //     return {
//   //         ContactList : jest.fn().mockImplementation(() => { return {} })
//   //     }
//   // });

//   beforeAll(() => {
//     res.send.mockClear();
//     res.json.mockClear();

//     Date.now = jest.fn().mockResolvedValue("");

//     createContactDocumentationOneStep = jest.fn().mockReturnValue({
//       status: false,
//       dupContact: {
//         _id: "615454b320f2bc5738d53e1b",
//         lastName: "test",
//         firstName: "test",
//         phone: ["123456789"],
//         email: ["123412@123.com"],
//         occupation: "student",
//         addDate: "",
//         status: true,
//         ownerAccount: "61388c3f914dcd011339fb6b",
//       },
//     });

//     createContactPhotoUpload = jest.fn().mockReturnValue(null);
//     contactController.createContactOneStep(req, res);
//   });

//   test("Test case 1: test with user create contact that didn't have an account", () => {
//     expect(res.json).toHaveBeenCalledTimes(1);
//     expect(res.json).toHaveBeenCalledWith({
//       status: false,
//       msg: "dupcontact/createProblem",
//       contactId: "615454b320f2bc5738d53e1b",
//     });
//   });
// });
