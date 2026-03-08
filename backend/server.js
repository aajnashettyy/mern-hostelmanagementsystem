// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// DB Connect (set MONGO_URL in .env)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connect error:", err));

/* MODELS */
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "student" },
  })
);

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    roomNumber: String,
    capacity: Number,
    status: { type: String, default: "Available" },
  })
);


const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    roomId: String, // store Room._id
    phone: String,
  })
);

// Complaint model
const Complaint = mongoose.model(
  "Complaint",
  new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: "Pending" }, // Pending, In-progress, Resolved
    createdAt: { type: Date, default: Date.now }
  })
);
/* COMPLAINTS CRUD */
// Get all complaints
app.get("/complaints", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

// Add a complaint (for demo/testing, admin can add)
app.post("/complaints", async (req, res) => {
  try {
    const { title, description } = req.body;
    const complaint = await Complaint.create({ title, description });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: "Could not create complaint" });
  }
});

// Update complaint status
app.patch("/complaints/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Could not update complaint" });
  }
});

/* AUTH */
// register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.json({ success: true, user });
  } catch (err) {
    console.error("register err:", err);
    res.status(400).json({ error: "Registration failed" });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secret123", { expiresIn: "7d" });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("login err:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ROOMS CRUD */
app.post("/rooms", async (req, res) => {
  try {
    const { roomNumber, capacity } = req.body;
    const r = await Room.create({ roomNumber, capacity });
    res.json(r);
  } catch (err) {
    console.error("rooms POST err:", err);
    res.status(400).json({ error: "Could not create room" });
  }
});

app.get("/rooms", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

app.delete("/rooms/:id", async (req, res) => {
  const out = await Room.findByIdAndDelete(req.params.id);
  res.json(out);
});

/* STUDENTS CRUD with capacity check */
app.post("/students", async (req, res) => {
  try {
    const { name, phone, roomId } = req.body;
    if (!name || !phone || !roomId) {
      return res.status(400).json({ error: "Missing name/phone/roomId" });
    }

    // find room by MongoDB _id
    const room = await Room.findById(roomId);
    if (!room) return res.status(400).json({ error: "Room not found" });

    const studentCount = await Student.countDocuments({ roomId });
    if (studentCount >= Number(room.capacity || 0)) {
      return res.status(400).json({ error: "Room is full" });
    }

    const student = await Student.create({ name, phone, roomId });
    return res.status(201).json(student);
  } catch (err) {
    console.error("students POST err:", err);
    return res.status(500).json({ error: "Error adding student" });
  }
});

app.get("/students", async (req, res) => {
  // return students; we'll return roomId as stored (frontend will map to rooms array)
  const students = await Student.find();
  res.json(students);
});

app.delete("/students/:id", async (req, res) => {
  const out = await Student.findByIdAndDelete(req.params.id);
  res.json(out);
});

/* start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
