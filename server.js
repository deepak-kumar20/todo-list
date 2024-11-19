const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejsLayouts = require("express-ejs-layouts"); // Import the layouts package
const todoController = require("./controllers/todoController");
const Todo = require("./models/todoModel");

const app = express();
const port = 8000;

// Connect to MongoDB Atlas
const dbURI =
  "mongodb+srv://deepak22:xyzxyzxyz@deepak-cluster.mzebt.mongodb.net/?retryWrites=true&w=majority&appName=Deepak-cluster";

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serving static files
app.use(ejsLayouts); // Use express-ejs-layouts

// Set the view engine to EJS
app.set("view engine", "ejs");

// Routes
app.post("/add", todoController.addTodo);
app.post("/delete", todoController.deleteTodo);

app.get("/", async (req, res) => {
  try {
    // Fetch todos from the database
    const todos = await Todo.find();

    // Render the content (index.ejs), using layout.ejs automatically
    res.render("index", { todos: todos });
  } catch (err) {
    console.log("Error fetching todos:", err);
    res.status(500).send("Error fetching todos");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
