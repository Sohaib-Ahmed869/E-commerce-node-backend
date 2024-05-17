const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user');
const contactRoutes = require('./Routes/contact');
const orderRoutes = require('./Routes/order');
const MailRoutes = require('./Routes/emailRoutes');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sohaibsipra869:nvidia940MX@cluster0.dcrk8mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
    }
)

// Routes
app.use('/user', userRoutes);
app.use('/contact', contactRoutes);
app.use('/order', orderRoutes);
app.use('/email', MailRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server started');
});

