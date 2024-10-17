const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/to-do-list");

const ToDo = mongoose.model("ToDo", {
  name: String,
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = new ToDo({
      name: req.body.name,
    });
    await newTodo.save();
    res.status(201).json({ message: "created" });
  } catch (error) {
    res.status(500).json({ message: error.messages });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const list = await ToDo.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    console.log(req.body);
    const upDateToDo = await ToDo.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
    });
    console.log(upDateToDo);
    res.json({
      message: "task successfully updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.body._id);
    res.json({ message: "task successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "This route does not exist" });
});
app.listen(3000, () => {
  console.log("racket departs");
});
