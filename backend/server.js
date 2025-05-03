require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/db'); // Correct single import

// Import routes
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const postRouter = require('./routes/post');
const storyRouter = require('./routes/story');
const userRouter = require('./routes/user');

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB and then start server
connectToDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB. Server not started.', err);
  });

// Routes
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/post", postRouter);
app.use("/story", storyRouter);
app.use("/user", userRouter);
