require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userSchema');

const corsOptions = {
    origin: [process.env.APPLICATION_URL, "https://crud-mern-app-ebon.vercel.app"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection with Proper Error Handling
mongoose.connect('mongodb://localhost:27017/proj5', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process on connection failure
});

// Create User
app.post('/createUser', async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error creating user', details: err.message });
    }
});

// Get All Users
app.get('/', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users', details: err.message });
    }
});

// Get Single User
app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err.message });
    }
});

// Update User
app.put('/updateUser/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error updating user', details: err.message });
    }
});

// Delete User
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user', details: err.message });
    }
});

// Start Server
app.listen(3001, () => {
    console.log("Server is running at port 3001");
});

// Handle unexpected errors
process.on('uncaughtException', (err) => {
    console.error('Unexpected Error:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
});
