const db = require('./db');

async function saveReceivedLoan(date, transaction_id, name, amount, loan_type, installment_amount, total_installment, installment_number, remaining_amount) {
    const query = 'INSERT INTO receiveloan (date, transaction_id, name, amount, loan_type, installment_amount, total_installment, installment_number, remaining_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [date, transaction_id, name, amount, loan_type, installment_amount, total_installment, installment_number, remaining_amount];

    try {
        const [result] = await db.query(query, values);
        return result.insertId;
    } catch (error) {
        console.error(error);
        throw new Error('Error saving received loan');
    }
}

async function searchTransactionByTransactionId(transaction_id, table) {
    const query = `SELECT name, amount, remaining_amount FROM ${table} WHERE transaction_id = ?`;
    const [result] = await db.query(query, [transaction_id]);
    return result;
}


// Update the SQL query in getMonthlyInstallmentAmount function in receiveloanModel.js
async function getMonthlyInstallmentAmount(transaction_id) {
    const query = 'SELECT installment, monthly_installment FROM giveloan WHERE transaction_id = ?';
    const [result] = await db.query(query, [transaction_id]);
    return result;
}

async function fetchAllData() {
    const query = 'SELECT * FROM receiveloan';
    const [result] = await db.query(query);
    return result;
}

module.exports = { saveReceivedLoan, searchTransactionByTransactionId, getMonthlyInstallmentAmount, fetchAllData,  db };



