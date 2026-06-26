require("dotenv").config();
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(console.log("Mongo connected"))
.catch((err)=>console.log(err));

const userDetails=new mongoose.Schema({
    email:String,
    password:String
});

const user=mongoose.model("user",userDetails);
module.exports=user;