// models/inventory.js

const pool = require('./db');

async function fetchProductNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT productName FROM products');
        connection.release();
        const productNames = rows.map(row => row.productName);
        return productNames;
    } catch (error) {
        console.error('Error fetching product names:', error);
        throw error;
    }
}

async function saveToDatabase(data) {
    try {
        const connection = await pool.getConnection();

        for (const row of data) {
            try {
                await connection.query('INSERT INTO inventory (date, product_name, supplier_name, price, quantity, total) VALUES (?, ?, ?, ?, ?, ?)', [
                    row.date,
                    row.productName, // Corrected property name
                    row.supplierName, // Corrected property name
                    row.price,
                    row.quantity,
                    row.total
                ]);
            } catch (sqlError) {
                console.error('SQL Error:', sqlError);
                throw sqlError;
            }
        }

        connection.release();
    } catch (error) {
        console.error('Error saving to database:', error);
        throw error;
    }
}



async function fetchSupplierNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT supplier_name FROM suppliers');
        connection.release();
        
        const supplierNames = rows.map(row => row.supplier_name);

        return supplierNames;
    } catch (error) {
        console.error('Error fetching supplier names:', error);
        throw error;
    }
}

async function fetchInventoryData() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM inventory');
        connection.release();

        return rows.map(row => ({
            date: row.date,
            productName: row.product_name, // Ensure this matches your actual column name
            supplierName: row.supplier_name, // Ensure this matches your actual column name
            price: row.price,
            quantity: row.quantity,
            total: row.total
        }));
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        throw error;
    }
}

module.exports = {
    fetchProductNames,
    saveToDatabase,
    fetchSupplierNames,
    fetchInventoryData,
};
