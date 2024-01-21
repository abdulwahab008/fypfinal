const db = require('./db');

async function createProduct({ sku, category, productName, description, price }) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Get category ID based on category name
        const categoryId = await getCategoryIdByName(category);

        const [result] = await connection.execute(
            'INSERT INTO products (sku, categoryName, productName, description, price) VALUES (?, ?, ?, ?, ?)',
            [sku, category, productName, description, price]
        );

        await connection.commit();

        return {
            id: result.insertId,
            sku,
            category,
            productName,
            description,
            price,
        };
    } catch (error) {
        console.error('Error creating product:', error);
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getAllProducts() {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        return rows;
    } finally {
        connection.release();
    }
}

async function getCategories() {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.execute('SELECT name FROM categories');
        return rows;
    } finally {
        connection.release();
    }
}

async function getCategoryIdByName(categoryName) {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.execute('SELECT id FROM categories WHERE name = ?', [categoryName]);

        if (result.length > 0) {
            return result[0].id;
        } else {
            throw new Error('Category not found');
        }
    } finally {
        connection.release();
    }
}

async function getProductBySKU(sku) {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM products WHERE sku = ?', [sku]);
        return rows.length > 0 ? rows[0] : null;
    } finally {
        connection.release();
    }
}

// async function editProduct({ sku, category, productName, description, price }) {
//     const connection = await db.getConnection();
//     try {
//         await connection.beginTransaction();

//         // Get category ID based on category name
//         const categoryId = await getCategoryIdByName(category);

//         const [result] = await connection.execute(
//             'UPDATE products SET categoryName = ?, productName = ?, description = ?, price = ? WHERE sku = ?',
//             [category, productName, description, price, sku]
//         );

//         await connection.commit();

//         if (result.affectedRows > 0) {
//             // Fetch the updated product after the commit
//             const updatedProduct = await getProductBySKU(sku);

//             return updatedProduct;
//         } else {
//             return null; // Product not found
//         }
//     } catch (error) {
//         console.error('Error editing product:', error);
//         await connection.rollback();
//         throw error;
//     } finally {
//         connection.release();
//     }
// }

async function deleteProduct(sku) {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.execute('DELETE FROM products WHERE sku = ?', [sku]);

        if (result.affectedRows > 0) {
            return true; // Product deleted successfully
        } else {
            return false; // Product not found
        }
    } finally {
        connection.release();
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getCategories,
    // editProduct,
    deleteProduct,
};
