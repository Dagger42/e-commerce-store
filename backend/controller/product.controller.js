import Product from '../models/product.model.js'
import mongoose from 'mongoose';

export async function getProducts(req, res) {
    try {
        const allProducts = await Product.find(); // get all products from the database
        res.status(200).json({ success: true, data: allProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function createProduct(req, res) {
    const product = req.body; // user will send the product data in the request body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }
    const newProduct = new Product(product); // create a new product instance
    try {
        await newProduct.save(); // save the product to the database
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function deleteProduct(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {  
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        await Product.findByIdAndDelete(req.params.id); // delete the product from the database 
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function updateProduct(req, res) {
    const productId = req.params.id;
    const product = req.body; 
    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {  
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        const updatedProd = await Product.findByIdAndUpdate(productId, product, { new: true }); // update the product in the database
        if (!updatedProd) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProd });
    } catch(error) {
        res.status(500).json({ success: false, message: "Product not found" });
    }
}