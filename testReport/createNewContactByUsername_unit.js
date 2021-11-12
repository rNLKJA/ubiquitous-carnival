// const mongoose = require("mongoose");

// const Contact = require("../../models/contactSchema");
// const Record = require("../../models/recordSchema");
// const { User, ContactList } = require("../../models/userSchema");

// const contactController = require("../../controller/contactController");

// describe("unit test of createNewContact form contactController.js", () => {
//   const req = {
//     user: { _id: "61503926028ce448aceda136" },
//     body: {
//       userName: "test123",
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

//     User.findOne = jest.fn().mockResolvedValue({
//       _id: "61388c3f914dcd011339fb6b",
//       lastName: "test",
//       firstName: "test",
//       phone: ["123456789"],
//       email: ["123412@123.com"],
//       occcupation: "student",
//     });

//     User.findOne
//       .mockImplementationOnce(() => ({
//         lean: jest.fn().mockReturnValue({
//           contactList: [],
//         }),
//       }))
//       .mockImplementationOnce(() => ({
//         lean: jest.fn().mockReturnValue({
//           _id: "61388c3f914dcd011339fb6b",
//           lastName: "test",
//           firstName: "test",
//           phone: ["123456789"],
//           email: ["123412@123.com"],
//           occcupation: "student",
//         }),
//       }));

//     // User.findOne.mockImplementationOnce(() => ({
//     //   lean: jest.fn().mockReturnValue({
//     //     _id: "61388c3f914dcd011339fb6b",
//     //     lastName: "test",
//     //     firstName: "test",
//     //     phone: ["123456789"],
//     //     email: ["123412@123.com"],
//     //     occcupation: "student",
//     //   }),
//     // }));

//     Contact.findOne = jest.fn().mockResolvedValue(null);

//     Contact.findOne.mockImplementationOnce(() => ({
//       lean: jest.fn().mockReturnValue(null),
//     }));

//     Contact.create = jest.fn().mockResolvedValue({
//       lastName: "test",
//       firstName: "test",
//       phone: ["123456789"],
//       email: ["123412@123.com"],
//       occcupation: "student",
//       addDate: "",
//       status: true,
//       ownerAccount: "61503926028ce448aceda136",
//       linkedAccount: "61388c3f914dcd011339fb6b",
//     });

//     contactController.createContactbyUserName(req, res);
//   });

//   test("Test case 1: test with user create contact that didn't have an account", () => {
//     expect(res.json).toHaveBeenCalledTimes(1);
//     expect(res.json).toHaveBeenCalledWith({
//       lastName: "test",
//       firstName: "test",
//       phone: ["123456789"],
//       email: ["123412@123.com"],
//       occcupation: "student",
//       addDate: "",
//       status: true,
//       ownerAccount: "61503926028ce448aceda136",
//       linkedAccount: "61388c3f914dcd011339fb6b",
//     });
//   });
// });
