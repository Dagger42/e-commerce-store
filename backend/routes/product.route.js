import express from 'express';
import {getProducts, createProduct, deleteProduct, updateProduct} from '../controller/product.controller.js'



const router = express.Router();



router.post("", createProduct); // create a new product in the database

router.delete("/:id", deleteProduct) // delete a product from the database by id

router.get("", getProducts); // get all products from the database

router.put("/:id", updateProduct); // update a product in the database by id


export default router;