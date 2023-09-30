const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
/*
    @des: Get all contacts
    @route: /api/contacts
    @access: public 
*/
const getAllContacts = asyncHandler(async (req, res) => {
    const contactList = await contactModel.find();
    res.status(200).json(contactList);
});
/*
    @des: Get single contact
    @route: /api/contacts:id
    @access: public
*/
const getContact = asyncHandler(async (req, res) => {
    const singleContact = await contactModel.findById(req.params.id);
    if (!singleContact) {
        res.status(404);
        throw new Error("Contact not found.");
    }
    res.status(200).json(singleContact);
});
/*
    @des : Create contact
    @route: /api/contacts
    @access: public 
*/
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mandatory !!");
    }
    const checkUser = await contactModel.find({ "email": email });
    if (checkUser.length > 0) {
        res.status(400);
        throw new Error("Email already linked with an account.");
    }
    const newContact = await contactModel.create({
        name,
        email,
        phone
    });
    res.status(201).json(newContact);
});
/*
    @des: Update contact
    @route: /api/contacts:id
    @access: public 
*/
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }
    const checkUser = await contactModel.find({ "email": req.body.email });
    if (checkUser.length > 0) {
        res.status(400);
        throw new Error("Email already linked with an account.");
    }
    //updating 
    const updatedContact = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});
/*
    @des: Delete contact
    @route: /api/contacts:id
    @access: public 
*/
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }
    await contactModel.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});


module.exports = { getAllContacts, getContact, createContact, updateContact, deleteContact };