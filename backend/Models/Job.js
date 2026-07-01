require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB conn"))
    .catch((err) => console.log(err))

const jobs=new mongoose.Schema({
    title:String,
    company:String,
    salary:Number,
    qualification: String,
    skills: String,
    yearsOfExp: Number,
    jobDesc: String,
    postedAt:
    {
        type:Date,
        default: Date.now
    }
})

const Job=mongoose.model("Job",jobs)
module.exports=Job;