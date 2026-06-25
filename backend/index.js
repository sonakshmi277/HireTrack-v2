require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const adminRouter = require("./Routers/adminD");
app.use("/adminData", adminRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("port is running at 5000")
})