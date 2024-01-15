// const express = require('express');
// const Task = require('../models/Task');

// const router = express.Router();

// router.get('/tasks', async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });

// router.post('/tasks', async (req, res) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: 'Text is required for a task' });
//   }

//   const newTask = new Task({ text });
//   await newTask.save();

//   const tasks = await Task.find();
//   res.json(tasks);
// });

// router.delete('/tasks/:id', async (req, res) => {
//   const { id } = req.params;
//   await Task.findByIdAndDelete(id);

//   const tasks = await Task.find();
//   res.json(tasks);
// });

// module.exports = router;
