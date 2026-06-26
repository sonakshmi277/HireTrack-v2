require("dotenv").config();
const express = require("express");
const router = express.Router();
const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {

    try {
        const admin = await Admin.findOne({
            company: req.body.company,
            email: req.body.email,
            password: req.body.password
        });
        if (admin) {
            const payload = { email: req.body.email }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
            return res.status(200).json({token})
        }
        else{
            return res.status(401).json("No admin exists")
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;