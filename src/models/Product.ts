import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "./IProduct";

const DataSchema = new Schema<IProduct>({
    brand: {
        type: String,
        required: [true, 'Ingrese la marca del producto'],
        trim: true,
        maxLength: [50, 'La marca del producto no puede tener mas de 100 caracteres']
    },
    model: {
        type: String,
        required: [true, 'Ingrese el modelo del producto'],
        trim: true,
        maxLength: [50, 'El modelo del producto no puede tener mas de 50 caracteres']
    },
    presentation: {
        type: String,
        required: false,
        trim: true,
        maxLength: [10, 'La presentacion del producto no puede tener mas de 10 caracteres']
    },
    purchasePrice: {
        type: Number,
        required: [true, 'Ingrese el precio de compra del producto']
    },
    salePrice: {
        type: Number,
        required: [true, 'Ingrese el precio de venta del producto']
    },
    saleGain: {
        type: Number,
        required: [true, 'Ingrese el precio de venta del producto']
    },
    status: {
        type: Boolean,
        required: [true, 'Ingrese el estado del producto']
    }
}, { timestamps: true, versionKey: false });

const Product = mongoose.model<IProduct>('Product', DataSchema, 'products');

export default Product;