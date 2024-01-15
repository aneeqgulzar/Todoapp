const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
// const PORT = process.env.PORT || 3001;

app.use(cors(
  {
    origin: []
  }
));
app.use(express.json());


connectDB();


app.use('/api', taskRoutes);

// function startServer() {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

// startServer();
