const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
/*
    @des: Get all contacts
    @route: /api/contacts
    @access: private 
*/
const getAllContacts = asyncHandler(async (req, res) => {
    const contactList = await contactModel.find({userId: req.user.id});
    res.status(200).json(contactList);
});
/*
    @des: Get single contact
    @route: /api/contacts:id
    @access: private
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
    @access: private 
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
        phone,
        userId: req.user.id
    });
    res.status(201).json(newContact);
});
/*
    @des: Update contact
    @route: /api/contacts:id
    @access: private 
*/
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }
    
    if(contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized.");
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
    if(contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized.");
    }
    await contactModel.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});


module.exports = { getAllContacts, getContact, createContact, updateContact, deleteContact };