const mongoose = require('mongoose');
const dns = require("dns")
dns.setServer(["8.8.8.8",8.8.4.4"])
const dbURI = 'mongodb+srv://vishalkolli21:vishalchowdarykolli21@cluster0.8zoym81.mongodb.net/vishalchowdarykolli'; 

const connectDB = () => {
  mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;
