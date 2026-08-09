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
const upload = require("./config/multerResume")
const Admin = require("./Models/Admin");
const User = require("./Models/User");
const applicant = require("./Models/Application");
const auth = require("./middlewares/auth")
const Job = require("./Models/Job");
const Appli = require("./Models/Application");
const user = require("./Models/User");
app.use("/adminData", adminRouter)
app.use("/signIn", userRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        const exists = await Admin.findOne({ password: "IAMADMIN" });

        if (!exists) {
            await Admin.create({
                company: "Cognizant",
                email: "admin@gmail.com",
                password: "IAMADMIN"
            });

            console.log("Admin created");
        }
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

app.post("/newLogIn", async (req, res) => {
  try {
    const tb = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    console.log("Info saved in db");
    const payload = { email: req.body.email, _id: tb._id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ token })


  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});



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

app.get("/availJobs", auth, async (req, res) => {
  try {
    const jobs = await Job.find();
    const appli = await applicant.find({ user_id: req.user._id });
    console.log("data found", { jobs, appli });
    res.status(200).json({ jobs, appli });
  } catch (err) {
    res.status(500).json({ message: "error fetching jobs" });
  }
})
app.use("/uploads", express.static("uploads"));
app.post("/uploadResume", auth, upload.single("resume"), async (req, res) => {
  console.log(req.file);
  try {
    const exists = await applicant.findOne({
      user_id: req.user._id,
      job_id: req.body.job_id
    });

    if (exists) {
      return res.status(400).json({
        message: "Already applied for this job."
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume."
      });
    }
    await applicant.create({
      user_id: req.user._id,
      job_id: req.body.job_id,
      resume: req.file.path
    });

    return res.json({
      message: "File uploaded successfully",
      file: req.file
    });

  } catch (err) {
    return res.json({ error: err.message });
  }
});

app.get("/applidetail", auth, async (req, res) => {
  try {
    const applicants = await applicant.find().populate("job_id").populate("user_id");
    console.log("Data found");
    res.status(200).json(applicants)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.patch("/changeDetail", async (req, res) => {
  try {
    const updated = await applicant.findByIdAndUpdate(
      req.body._id, {
      $set: {
        status: req.body.status
      }
    },
      { new: true }
    )
    console.log("Data changed")
    res.status(200).json(updated)
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
})

app.delete("/manageDel/:id", auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    await Job.deleteOne({ _id: jobId })
    await Appli.deleteMany({ job_id: jobId });
    const jobs = await Job.find();
    const appli = await applicant.find({ user_id: req.user._id });
    console.log("data found", { jobs, appli });
    res.status(200).json({ jobs, appli });
  } catch (err) {
    res.status(500).json({ message: "error fetching jobs" });
  }
})
app.patch("/editJob/:id", auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $set: {
          company: req.body.company,
          title: req.body.title,
          salary: req.body.salary,
          qualification: req.body.qualification,
          skills: req.body.skills,
          yearsOfExp: req.body.yearsOfExp,
          jobDesc: req.body.jobDesc
        }
      },
      { new: true }
    );
    res.status(200).json(updatedJob);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.get("/jobCount", auth, async (req, res) => {
  try {
    const ct = await Job.countDocuments();
    res.status(200).json({ totalJobs: ct });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.get("/applicationCounts", auth, async (req, res) => {
  try {
    const [pending, interview, selected, rejected, appliCt,reviewing] = await Promise.all([
      Appli.countDocuments({ status: "Pending" }),
      Appli.countDocuments({ status: "Interview" }),
      Appli.countDocuments({ status: "Selected" }),
      Appli.countDocuments({ status: "Rejected" }),
      Appli.countDocuments(),
      Appli.countDocuments({status:"Reviewing"})
    ]);

    res.json({
      pending,
      interview,
      selected,
      rejected,
      appliCt,
      reviewing
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/userIdAppliCt", auth, async (req, res) => {
  try {
    const userId=req.user._id;
    const [pending, interview, selected, rejected, appliCt,reviewing] = await Promise.all([
      Appli.countDocuments({ user_id:userId,status: "Pending" }),
      Appli.countDocuments({ user_id:userId,status: "Interview" }),
      Appli.countDocuments({user_id:userId, status: "Selected" }),
      Appli.countDocuments({ user_id:userId,status: "Rejected" }),
      Appli.countDocuments({user_id:userId}),
      Appli.countDocuments({user_id:userId,status:"Reviewing"})
    ]);

    res.json({
      pending,
      interview,
      selected,
      rejected,
      appliCt,
      reviewing
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/recentJobs", auth, async (req, res) => {
  try {
    const j = await Job.find().sort({ postedAt: -1 }).limit(2);
    res.status(200).json(j);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`port is running at ${PORT}`);
});