// closingModel.js
const pool = require('./db');

async function saveClosing(closingData) {
    try {
        const { date, telenorLoad, zongLoad, jazzLoad, ufoneLoad, easypaisa, jazzCash, loan, cash, bank, credit, total } = closingData;

        const query = `
            INSERT INTO closing (date, telenorLoad, zongLoad, jazzLoad, ufoneLoad, easypaisa, jazzCash, loan, cash, bank, credit, total)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [date, telenorLoad, zongLoad, jazzLoad, ufoneLoad, easypaisa, jazzCash, loan, cash, bank, credit,total];

        const [result] = await pool.execute(query, values);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

async function getAllClosing() {
    try {
        const query = 'SELECT * FROM closing';
        const [closingData] = await pool.execute(query);
        return closingData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    saveClosing,
    getAllClosing,
};