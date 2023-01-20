import Product from "../models/Product";
import { Request, Response } from 'express';

// Create a new Product
const createProduct = async (req: Request, res: Response) => {
    let payload = req.body;
    try {
        const productCreate = await new Product(payload).save();
        return res.status(201).json({
            code: 201,
            message: 'Producto creado correctamente',
            data: productCreate
        });
    } catch (error: any) {
        res.status(501).json({
            code: 501,
            message: error.message,
            error: true,
        });
    }
}


// Get all products
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const allProductsInfo = await Product.find().select(['-createdAt', '-updatedAt']);
        return res.status(200).json({
            code: 200,
            message: "Get all products",
            data: allProductsInfo
        })

    } catch (error: any) {
        res.status(501).json({
            code: 501,
            message: error.message,
            error: true
        })
    }
}

const getProductDetails = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const productInfo = await Product.findOne({ _id: id }).select(['-createdAt', '-updatedAt']);
        return res.status(200).json({
            code: 200,
            message: "Product Info",
            data: productInfo
        })
    } catch (error: any) {
        res.status(501).json({
            code: 501,
            message: error.message,
            error: true
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {

    const id = req.params.id;
    let reqBody = req.body;

    try {

        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, reqBody);
        return res.status(200).json({
            code: 200,
            message: "Product Info",
            data: updatedProduct
        })
    } catch (error: any) {
        res.status(501).json({
            code: 501,
            message: error.message,
            error: true,
        });
    }

}

const deleteProduct = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {

        const deletedProduct = await Product.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            code: 200,
            message: "Product Info",
            data: deletedProduct
        })
    } catch (error: any) {
        res.status(501).json({
            code: 501,
            message: error.message,
            error: true,
        });
    }

}

export {
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct,
}