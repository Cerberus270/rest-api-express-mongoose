export interface IProduct {
    id: string
    brand: string,
    model: string
    presentation?: string,
    purchasePrice: number
    salePrice: number
    saleGain: number
    status: boolean,
}