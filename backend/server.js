const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const Task = require('./models/Task');

const app = express();

app.use(cors(
  {
    origin: ["https:todoapp-api-kohl.vercel.app"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
  }
));
app.use(express.json());

connectDB();

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for a task' });
  }

  const newTask = new Task({ text });
  await newTask.save();

  const tasks = await Task.find();
  res.json(tasks);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);

  const tasks = await Task.find();
  res.json(tasks);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
