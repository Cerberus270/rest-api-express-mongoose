import express from "express";
import { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct } from "../controllers/ProductController";

const router = express.Router();

router.post('/product', createProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductDetails)
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct)

export default router

