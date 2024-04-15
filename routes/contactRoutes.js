const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controllers/userController");

router.route("/").get(auth, getAllContacts);
router.route("/register").put(auth, updateContact);
router.route("/:id").delete(auth, deleteContact);

module.exports = router;
