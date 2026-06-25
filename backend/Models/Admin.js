require("dotenv").config();
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI)
.then(console.log("MongoDB conn"))
.catch((err)=>console.log(err))

const adminDetails=new mongoose.Schema({
    company:String,
    email:String,
    password:String
});

const Admin=mongoose.model("Admin",adminDetails);
module.exports=Admin;