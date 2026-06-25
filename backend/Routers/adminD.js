const express = require("express");
const router = express.Router();
const Admin = require("../Models/Admin");

router.post("/", async (req, res) => {

    try {
        const admin = await Admin.findOne({
            company: req.body.company,
            email: req.body.email,
            password: req.body.password
        });

        if (admin) {
            return res.json("Yes");
        } else {
            return res.json("No");
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;