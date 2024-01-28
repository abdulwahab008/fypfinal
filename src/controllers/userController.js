const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
//const db = require('../models/db');

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
            console.log('Received data:', { username, password });
    
            // Retrieve user data from the database based on the username
            const user = await UserModel.getByUsername(username);
    
            console.log('Retrieved user data:', user);
    
            if (!user) {
                // If user not found, send an error response
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            // Check if the provided password matches the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (passwordMatch) {
                // Save user data in the session
                req.session.user = user;
    
                // Calculate expiration date (e.g., set session expiration to 1 hour from now)
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration to 1 hour from now
    
                console.log('req.sessionId:', req.sessionID);
                console.log('user:', user);
    
                // Ensure that req.sessionId and user.id are defined
                if (req.sessionID && user.id) {
                    // Save session data in the sessions table with the calculated expiration date
                    await UserModel.saveSessionData(user.id, req.sessionID, expirationDate);
    
                    // Send a success response with the redirect URL
                    return res.status(200).json({
                        redirectTo: '/dashboard.html',
                        user: {
                            name: user.name,
                            username: user.username,
                            email: user.email,
                        },
                    });
                } else {
                    console.error('One or more required parameters are undefined');
                    console.error('req.sessionId:', req.sessionID);
                    console.error('user:', user);
                    throw new Error('One or more required parameters are undefined');
                }
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
    },
};

module.exports = UserController;
