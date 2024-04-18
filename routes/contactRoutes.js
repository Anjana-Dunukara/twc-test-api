const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllContacts,
  updateContact,
  deleteContact,
  createContact,
  getContactById,
} = require("../controllers/contactController");

router.route("/").get(auth, getAllContacts);
router.route("/:id").get(auth, getContactById);
router.route("/").post(auth, createContact);
router.route("/:id").put(auth, updateContact);
router.route("/:id").delete(auth, deleteContact);

module.exports = router;
