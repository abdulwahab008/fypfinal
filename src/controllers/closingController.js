// closingController.js
const closingModel = require('../models/closingModel');

async function saveClosing(req, res) {
    try {
        console.log('Request received:', req.body);
        const closingData = req.body;

        const closingId = await closingModel.saveClosing(closingData);

        console.log('Closing data saved successfully');
        res.json({ success: true, closingId });
    } catch (error) {
        console.error('Error saving closing data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

async function getAllClosing(req, res) {
    try {
        const allClosingData = await closingModel.getAllClosing();
        res.json(allClosingData);
    } catch (error) {
        console.error('Error fetching all closing data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    saveClosing,
    getAllClosing,
};
