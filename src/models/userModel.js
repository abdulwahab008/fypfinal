// userModel.js
const db = require('./db'); // Update the path based on your project structure

const UserModel = {
    save: async (user) => {
        const { name, email, phone, username, password } = user;

        const connection = await db.getConnection();
        try {
            await connection.execute(
                'INSERT INTO users (name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)',
                [name, email, phone, username, password]
            );
        } catch (error) {
            console.error('Error saving user:', error);
            throw error; // Rethrow the error
        } finally {
            connection.release();
        }
    },

    getByUsername: async (username) => {
        let connection;

        try {
            console.log('Type of username:', typeof username);
            console.log('Username:', username);

            if (typeof username !== 'string') {
                throw new Error('Username is not a valid string');
            }

            connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error getting user by username:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
};

module.exports = UserModel;
