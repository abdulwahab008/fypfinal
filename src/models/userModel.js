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
    },

    saveSessionData: async (userId, sessionId, expirationDate) => {
        try {
            if (userId === undefined || sessionId === undefined || expirationDate === undefined) {
                throw new Error('One or more required parameters are undefined');
            }

            const connection = await db.getConnection();

            // Try to insert the session data
            try {
                await connection.execute(
                    'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
                    [userId, sessionId, expirationDate]
                );
            } catch (insertError) {
                // If it's a duplicate entry error, update the existing record
                if (insertError.code === 'ER_DUP_ENTRY') {
                    await connection.execute(
                        'UPDATE sessions SET expires_at = ? WHERE user_id = ? AND token = ?',
                        [expirationDate, userId, sessionId]
                    );
                } else {
                    // If it's a different error, re-throw it
                    throw insertError;
                }
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error saving session data:', error);
            throw error;
        }
    },
};

module.exports = UserModel;
