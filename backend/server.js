require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/user-routes');

const { connectDB } = require('./config/mongo-db');
const employeeRoutes = require('./routes/employee-routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json());

app.use('/', userRoutes)
app.use('/emp', employeeRoutes);


// Port for MongoDB 
const PORT = process.env.PORT || 5001;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/comp3123_assignment2';

// Connect to MongoDB and start server
connectDB(uri).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
});
