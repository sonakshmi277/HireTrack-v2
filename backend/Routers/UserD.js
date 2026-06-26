const express=require("express");
const jwt = require("jsonwebtoken");
const router=express.Router();
const User=require("../Models/User");

router.post("/", async (req,res)=>{
    try{
        const userDet=await User.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(userDet){
            const payload={email:req.body.email}
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'})
            return res.status(200).json({token})
        }
        else{
            return res.status(401).json("No such user exists")
        }
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
});
module.exports=router;