const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('DB Connection Error: ', err));

// Định nghĩa Schema và Model cho nhân viên khớp với collection employees
const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  fullName: { type: String, required: true },
  gender: { type: String },
  dateOfBirth: { type: String },
  department: { type: String },
  position: { type: String },
  email: { type: String },
  phone: { type: String },
  hireDate: { type: String },
  status: { type: String }
});

const Employee = mongoose.model('Employee', employeeSchema, 'employees');

// API lấy danh sách nhân viên (GET)
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API thêm nhân viên mới (POST)
app.post('/api/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});