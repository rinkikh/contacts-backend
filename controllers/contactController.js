const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
const { Error } = require("mongoose");


//@desc Get all Contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
})

//@desc Get all Contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json(contact)
})

//@desc Create new Contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phn } = req.body;
    if (!name || !email || !phn) {
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phn,
        user_id :req.user.id,
    })
    res.status(201).json(contact)
}
)

const updateContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }
  
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.status(200).json(updatedContact);
  });


//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }
     await Contact.deleteOne({ _id: req.params.id });
    // await Contact.remove();
    res.status(200).json(contact);
  });

module.exports = {
    getContacts, getContact,
    createContact, updateContacts, deleteContact
}
