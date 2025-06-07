import { Request, Response } from 'express';
import { getAllProducts } from '../services/productService';
import { log } from 'console';


export const getProductsController = async (req: Request,res: Response) =>{
    try {
        const products = await getAllProducts();
        res.status(200).json({
            status: 'success',
            data: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'fetch data failed'
        })
    }
}