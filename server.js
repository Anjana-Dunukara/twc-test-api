const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// ROUTES
app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Successfully connected to database.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
