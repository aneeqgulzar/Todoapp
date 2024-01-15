const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://aneeqgulzaronline:H6XYgAMJowP0xd81@cluster0.xrhpcmw.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

module.exports = connectDB;
