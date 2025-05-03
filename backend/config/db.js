const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Use correct environment variable name: MONGO_URI (case-sensitive)
const mongoURI = process.env.MONGO_URI; // Corrected variable name

// Function to connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit the app on failure
  }
};

module.exports = { connectToDB };

