/*
    @des: Get all contacts
    @route: /api/contacts
    @access: public 
*/
const getAllContacts = (req, res) => {
    res.status(200).json({ message: "Get all contacts." });
};
/*
    @des: Get single contact
    @route: /api/contacts:id
    @access: public
*/
const getContact = (req, res) => {
    res.status(200).json({ message: "Get single contact" });
};
/*
    @des : Create contact
    @route: /api/contacts
    @access: public 
*/
const createContact = (req, res) => {
    res.status(201).json({ message: "create contact" });
};
/*
    @des: Update contact
    @route: /api/contacts:id
    @access: public 
*/
const updateContact = (req, res) => {
    res.status(200).json({ message: "update contact" });
};
/*
    @des: Delete contact
    @route: /api/contacts:id
    @access: public 
*/
const deleteContact = (req, res) => {
    res.status(200).json({ message: "delete contact" });
};

module.exports = { getAllContacts, getContact, createContact, updateContact, deleteContact };