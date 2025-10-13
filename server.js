require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { connectDB } = require('./mongo-db');
const employeeRoutes = require('./employee-routes');

// Create instance of express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/emp', employeeRoutes);

// Port for MongoDB 
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/comp3123_assignment1';

// Connect to MongoDB and start server
connectDB(uri).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
});
