const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const UserController = {
    signup: async (req, res) => {
        try {
            const { name, email, phone, username, password } = req.body;

            console.log("Received data:", { name, email, phone, username, password });

            // Check if the username is already taken
            const existingUser = await UserModel.getByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username is already taken' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save the user
            await UserModel.save({ name, email, phone, username, password: hashedPassword });
            console.log("User saved successfully");

            // You can add additional logic here if needed

            // Return success message if everything is fine
            return res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Retrieve user data from the database based on the username
            const user = await UserModel.getByUsername(username);
    
            if (!user) {
                // If user not found, send an error response
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            // Check if the provided password matches the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (passwordMatch) {
                // Save user data in the session
                req.session.user = user;
    
                // Send a success response with the redirect URL
                return res.status(200).json({ redirectTo: '/dashboard.html' });
            } else {
                // If password doesn't match, send an error response
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    }
};

module.exports = UserController;
