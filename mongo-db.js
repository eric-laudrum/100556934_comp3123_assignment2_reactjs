const mongoose = require('mongoose');


// Connect to MongoDB
async function connectDB(uri) {
  try {
    // Created successfully
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    // Failed to create
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// Export DB conenction
module.exports = { connectDB };