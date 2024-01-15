const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const taskRoutes = require('./routes/taskRoutes');

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


app.use('/api', taskRoutes);


