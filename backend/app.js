const express = require('express');
const bodyParser = require('body-parser');
const ip = require('ip');
const connectDB = require('./Config/db');
const userRoutes = require('./routes/userRoutes');
const plantRoutes = require('./routes/plantRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
// Start server
app.listen(port, () => {
  console.log(`Server is running at http://${ip.address()}:${port}`);
});
