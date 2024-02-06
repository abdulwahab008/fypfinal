<<<<<<< HEAD
// settingController.js

const getUserSettings = (req, res) => {
    // Fetch user settings logic here (e.g., from a database)
    const userSettings = {
        name: "John Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        profilePicture: "path/to/profile-picture.jpg" // Path to the user's profile picture
    };

    res.json(userSettings);
};

const updateUserSettings = (req, res) => {
    // Update user settings logic here (e.g., save to a database)
    const updatedSettings = req.body; // Assuming request body contains updated settings

    // Update logic (e.g., save to a database)

    res.json({ message: "User settings updated successfully!" });
};

module.exports = {
    getUserSettings,
    updateUserSettings
};
=======
// settingController.js

const getUserSettings = (req, res) => {
    // Fetch user settings logic here (e.g., from a database)
    const userSettings = {
        name: "John Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        profilePicture: "path/to/profile-picture.jpg" // Path to the user's profile picture
    };

    res.json(userSettings);
};

const updateUserSettings = (req, res) => {
    // Update user settings logic here (e.g., save to a database)
    const updatedSettings = req.body; // Assuming request body contains updated settings

    // Update logic (e.g., save to a database)

    res.json({ message: "User settings updated successfully!" });
};

module.exports = {
    getUserSettings,
    updateUserSettings
};
>>>>>>> 2c2e4ab06074b0f32b83f4269ac4a737b98d0225
