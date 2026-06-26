require("dotenv").config();
const cors = require("cors");
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json());
const mongoose = require("mongoose");
const adminRouter = require("./Routers/adminD");
const userRouter=require("./Routers/UserD");
const Admin = require("./Models/Admin");
const User=require("./Models/User");
const auth=require("./middlewares/auth")
app.use("/adminData", adminRouter)
app.use("/signIn",userRouter)

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

app.post("/newLogIn", async (req,res)=>{
  try{
    await User.create({
      email:req.body.email,
      password:req.body.password
    });
    console.log("User details entered");
    return res.json("Yes");
  }catch(err){
    return res.json("No");
  }
});

addAdmin();

app.get("/adminHomePage",auth,(req,res)=>{
  res.status(200).json({
    message:"Welcome admin",
    admin:req.user
  });
})

app.listen(5000, () => {
  console.log("port is running at 5000")
})