const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory database
let students = [];

// Add a new student
app.post("/students", (req, res) => {
const { id, name, age, course } = req.body;

if (!id || !name || !age || !course) {
return res.status(400).json({
message: "Please provide id, name, age and course."
});
}

const existingStudent = students.find(student => student.id === id);

if (existingStudent) {
return res.status(400).json({
message: "Student already exists."
});
}

const newStudent = {
id,
name,
age,
course
};

students.push(newStudent);

res.status(201).json({
message: "Student added successfully.",
student: newStudent
});
});

// Get all students
app.get("/students", (req, res) => {
res.json(students);
});

// Get student by ID
app.get("/students/:id", (req, res) => {
const id = Number(req.params.id);

const student = students.find(student => student.id === id);

if (!student) {
return res.status(404).json({
message: "Student not found."
});
}

res.json(student);
});

// Update student
app.put("/students/:id", (req, res) => {
const id = Number(req.params.id);

const student = students.find(student => student.id === id);

if (!student) {
return res.status(404).json({
message: "Student not found."
});
}

const { name, age, course } = req.body;

if (name) student.name = name;
if (age) student.age = age;
if (course) student.course = course;

res.json({
message: "Student updated successfully.",
student
});
});

// Delete student
app.delete("/students/:id", (req, res) => {
const id = Number(req.params.id);

const index = students.findIndex(student => student.id === id);

if (index === -1) {
return res.status(404).json({
message: "Student not found."
});
}

const deletedStudent = students.splice(index, 1);

res.json({
message: "Student deleted successfully.",
student: deletedStudent[0]
});
});

// Start server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
