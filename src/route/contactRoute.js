const contactRouter = require("express").Router();
const { getAllContacts, getContact, createContact, updateContact, deleteContact } = require("../controller/contactController");
const auth = require("../middleware/auth");

contactRouter.use(auth);
contactRouter.route("/").get(getAllContacts).post(createContact);;

contactRouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = contactRouter;