const mongoose = require("mongoose");

const adminDetails = new mongoose.Schema({
    company: String,
    email: String,
    password: String
});

const Admin = mongoose.model("Admin", adminDetails);

module.exports = Admin;