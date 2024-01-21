// src/models/salesModel.js

const pool = require('./db');

async function fetchCategoryNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT DISTINCT categoryName FROM products');
        connection.release();

        const categoryNames = rows.map(row => row.categoryName);

        return categoryNames;
    } catch (error) {
        console.error('Error fetching category names:', error);
        throw error;
    }
}

async function fetchProductsByCategory(categoryName) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT productName, price FROM products WHERE categoryName = ?', [categoryName]);
        connection.release();

        const products = rows;

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function saveSalesToDatabase(data) {
    try {
        const connection = await pool.getConnection();

        // Extract data from the request body
        const { date, categoryName, productName, quantity, price, total } = data;

        // Insert sales data into the 'sales' table
        await connection.query(
            'INSERT INTO sales (date, categoryName, productName, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)',
            [date, categoryName, productName, quantity, price, total]
        );

        connection.release();
    } catch (error) {
        console.error('Error saving to database:', error);
        throw error;
    }
}
async function fetchSalesData() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM sales');
        connection.release();

        const salesData = rows;

        return salesData;
    } catch (error) {
        console.error('Error fetching sales data:', error);
        throw error;
    }
}

module.exports = {
    fetchCategoryNames,
    fetchProductsByCategory,
    saveSalesToDatabase,
    fetchSalesData,
};
