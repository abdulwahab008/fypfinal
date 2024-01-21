// src/controllers/productController.js

const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { sku, categoryName, productName, description, price } = req.body;

        // Validate input (you may add more validation)
        if (!sku || !categoryName || !productName || !description || !price) {
            return res.status(400).json({ error: 'Please fill in all fields.' });
        }

        const newProduct = await Product.createProduct({
            sku,
            category: categoryName, // Use the correct variable name
            productName,
            description,
            price,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.getCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.editProduct = async (req, res) => {
//     try {
//         const { sku } = req.params;
//         const { categoryName, productName, description, price } = req.body;

//         // Log the received data
//         console.log('Received data for editing product:', { sku, categoryName, productName, description, price });

//         // Validate input (you may add more validation)
//         if (!sku || !categoryName || !productName || !description || !price) {
//             console.error('Invalid input during product edit:', { sku, categoryName, productName, description, price });
//             return res.status(400).json({ error: 'Please fill in all fields.' });
//         }

//         // Log before the database update
//         console.log('Before database update:', { sku, categoryName, productName, description, price });

//         const updatedProduct = await Product.editProduct({
//             sku,
//             category: categoryName,
//             productName,
//             description,
//             price,
//         });

//         // Log after the database update
//         console.log('After database update:', updatedProduct);

//         if (updatedProduct) {
//             res.json(updatedProduct);
//         } else {
//             console.error('Product not found during edit:', { sku, categoryName, productName, description, price });
//             res.status(404).json({ error: 'Product not found' });
//         }
//     } catch (error) {
//         console.error('Error editing product:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

exports.deleteProduct = async (req, res) => {
    try {
        const { sku } = req.params;

        const result = await Product.deleteProduct(sku);

        if (result) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
