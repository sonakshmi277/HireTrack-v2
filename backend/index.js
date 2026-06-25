require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const adminRouter = require("./Routers/adminD");
const Admin=require("./Models/Admin");
app.use("/adminData", adminRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const addAdmin = async () => {
    const exists = await Admin.findOne({ company: "Cognizant" });

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