require("dotenv").config();
const cors = require("cors");
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json());
const mongoose = require("mongoose");
const adminRouter = require("./Routers/adminD");
const Admin = require("./Models/Admin");
app.use("/adminData", adminRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const addAdmin = async () => {
  const exists = await Admin.findOne({ password: "IAMADMIN" });

  if (!exists) {
    await Admin.create({
      company: "Cognizant",
      email: "admin@gmail.com",
      password: "IAMADMIN"
    });

    console.log("Admin created");
  }
};

addAdmin();
app.listen(5000, () => {
  console.log("port is running at 5000")
})