require("dotenv").config();
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB conn"))
    .catch((err) => console.log(err))

const applicant = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"

    },
    status: {
        type:String,
        default:"Pending"
    },
    resume: String,
    appliedAt:{
        type:Date,
        default:Date.now
    }
});

const Appli = mongoose.model("Applicant", applicant);
module.exports = Appli;