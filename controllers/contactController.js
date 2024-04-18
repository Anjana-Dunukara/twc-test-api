const Contact = require("../models/Contact");

exports.getAllContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find({ owner: req.user._id });

    res.status(200).json({
      allContacts,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({
        status: "failed",
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        contact,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact({
      ...req.body,
      owner: req.user._id,
    });

    await newContact.save();

    res.status(201).json({
      status: "success",
      data: {
        contact: newContact,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.updateContact = async (req, res) => {
  const contactUpadate = Object.keys(req.body);
  const allowedUpdates = ["fullName", "gender", "email", "phone"];

  const isValidOperation = contactUpadate.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send("Fields you are trying to update doesn't exsist.");
  }

  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!contact) {
      return res.status(404).send();
    }

    contactUpadate.forEach((update) => {
      contact[update] = req.body[update];
    });

    await contact.save();

    res.send(contact);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const task = await Contact.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
