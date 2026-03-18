const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Replace with your MongoDB URL
mongoose.connect("mongodb+srv://dangreyjam_db_user:dangrey@1@cluster0.71qefac.mongodb.net/?appName=Cluster0")
.then(() => console.log("DB Connected"));

const Response = mongoose.model("Response", {
  name: String,
  email: String,
  persona: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});

// Save data
app.post("/submit", async (req, res) => {
  const data = new Response(req.body);
  await data.save();
  res.send("Saved");
});

// Admin data
app.get("/admin", async (req, res) => {
  const data = await Response.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running"));
