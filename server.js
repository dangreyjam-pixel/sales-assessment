const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database you made in Phase 1
mongoose.connect(process.env.MONGO_URL);

// Create a structure for the data
const Response = mongoose.model('Response', {
    name: String, email: String, persona: String, role: String, date: { type: Date, default: Date.now }
});

// Route to SAVE data
app.post('/save', async (req, res) => {
    await new Response(req.body).save();
    res.send({ status: "Saved!" });
});

// Route for YOU (the Admin) to see data
app.get('/results', async (req, res) => {
    const data = await Response.find().sort({ date: -1 });
    res.json(data);
});

app.listen(process.env.PORT || 3000);
