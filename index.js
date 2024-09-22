const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const user = require("./user_schema");
const vote = require("./vote_schema");
app.use(express.json());

app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

connect();
app.get("/", async (req, res) => {
  const data = await vote.find();
  res.send(data);
});

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  try {
    const check = await user.findOne({ email });
    if (!check) {
      const newUser = new user({ email, username, password });
      await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    } else {
      res.send("Email Already Exists");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await user.findOne({ email });
    if (data) {
      if (data.password === password) {
        res.send(data);
      } else {
        res.send("User not found...");
      }
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/admin", (req, res) => {
  const password = req.body.password;
  if (password === process.env.ADMIN_PASSWORD) {
    res.send("Admin logged in");
  } else {
    res.send("Invalid");
  }
});

app.post("/createpoll", async (req, res) => {
  const poll = req.body.poll;
  const polldata = new vote({ title: poll, yes: 0, no: 0, voteduser: [] });
  await polldata.save();
  res.send("poll created");
});

app.post("/polls", async (req, res) => {
  const polldata = await vote.find();
  console.log(polldata);
  res.send(polldata);
});
app.post("/votedYes", async (req, res) => {
  const { email, _id } = req.body;
  console.log(email, _id);
  try {
    const Vote = await vote.findById(_id);
    console.log(Vote);
    Vote.yes++;
    if (!Vote.votedUsers) {
      Vote.voted_user = [];
    }
    Vote.voted_user.push(email);
    console.log(Vote);
    await Vote.save();
    const totalVotes = Vote.yes + Vote.no;
    const percentageYes = (Vote.yes / totalVotes) * 100;

    res.send("nikai");
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).send("Failed to record vote");
  }
});

app.post("/votedNo", async (req, res) => {
  const { email, _id } = req.body;
  console.log(email, _id);
  try {
    const Vote = await vote.findById(_id);
    console.log(Vote);
    Vote.no++;
    if (!Vote.votedUsers) {
      Vote.voted_user = [];
    }
    Vote.voted_user.push(email);
    console.log(Vote);
    await Vote.save();
    const totalVotes = Vote.yes + Vote.no;
    const percentageYes = (Vote.no / totalVotes) * 100;

    res.send("nikai");
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).send("Failed to record vote");
  }
});

app.listen(port, () => {
  console.log("listening on port 5151");
});
console.log("Starting.........");
