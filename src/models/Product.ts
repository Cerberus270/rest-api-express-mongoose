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
        required: false
    },
    status: {
        type: Boolean,
        required: [true, 'Ingrese el estado del producto']
    }
}, { timestamps: true, versionKey: false });

DataSchema.pre('save', function () {
    let value: string = (this.salePrice - this.purchasePrice).toFixed(2);
    this.saleGain = Number(value) >= 0 ? Number(value) : 0;
});

DataSchema.post('findOneAndUpdate', async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    let value: string = (docToUpdate.salePrice - docToUpdate.purchasePrice).toFixed(2);
    docToUpdate.saleGain = Number(value) >= 0 ? Number(value) : 0;
    await docToUpdate.save();
});

const Product = mongoose.model<IProduct>('Product', DataSchema, 'products');

export default Product;