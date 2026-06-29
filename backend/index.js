const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json());
const mongoose = require("mongoose");
const adminRouter = require("./Routers/adminD");
const userRouter = require("./Routers/UserD");
const Admin = require("./Models/Admin");
const User = require("./Models/User");
const auth = require("./middlewares/auth")
const Job = require("./Models/Job");
app.use("/adminData", adminRouter)
app.use("/signIn", userRouter)

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

app.post("/newLogIn", async (req, res) => {
  try {
    await User.create({
      email: req.body.email,
      password: req.body.password
    });
    console.log("Info saved in db");
    const payload = { email: req.body.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ token })


  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});


addAdmin();

app.get("/adminHomePage", auth, (req, res) => {
  res.status(200).json({
    message: "Welcome admin",
    admin: req.user
  });
})

app.post("/postNewJob", auth, async (req, res) => {
  try {
    await Job.create({
      title: req.body.title,
      company: req.body.company,
      salary: req.body.salary,
      qualification: req.body.qualification,
      skills: req.body.skills,
      yearsOfExp: req.body.yearsOfExp,
      jobDesc: req.body.jobDesc
    });
    console.log("Job update created");
    return res.status(200).json({ message: "Job posted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/UserPages/newJobUser", auth, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user}`,
    user: req.user
  });
})

app.get("/availJobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log("data found", { jobs });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "error fetching jobs" });
  }
})
app.listen(5000, () => {
  console.log("port is running at 5000")
})