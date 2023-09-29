const asyncHandler = require("express-async-handler");
/*
    @des: Get all contacts
    @route: /api/contacts
    @access: public 
*/
const getAllContacts = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Get all contacts." });
});
/*
    @des: Get single contact
    @route: /api/contacts:id
    @access: public
*/
const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Get single contact" });
});
/*
    @des : Create contact
    @route: /api/contacts
    @access: public 
*/
const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mandatory !!");
    }
    res.status(201).json({ message: "create contact" });
});
/*
    @des: Update contact
    @route: /api/contacts:id
    @access: public 
*/
const updateContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "update contact" });
});
/*
    @des: Delete contact
    @route: /api/contacts:id
    @access: public 
*/
const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "delete contact" });
});

module.exports = { getAllContacts, getContact, createContact, updateContact, deleteContact };