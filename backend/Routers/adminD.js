const express = require("express");
const router = express.Router();
const Admin=require("../Models/Admin");

router.get("/", async (req, res) => {
    try{
        const adminExists=await Admin.findOne({company:"Cognizant"});
        if(adminExists){
            res.json("Yes");
        }
        return res.json("No");
    }catch(err){
         res.status(500).json({ error: err.message });
    }
})

module.exports = router;