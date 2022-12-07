import { Request, Response, NextFunction } from 'express'
import {Order, OrderSrore} from "../models/order"
import dotenv from "dotenv";

dotenv.config();

const store = new OrderSrore()

export const create = async (req: Request, res: Response) => { 
    try {
       const order = {
            user_id: req.body.user_id,
            products: req.body.products,
            status: req.body.status
          };
        const orderCreated = await store.create(order)
        res.json(orderCreated)
    } catch(err) {
        res.status(400)
        console.log(err)
        res.json(err)
    }
  }

  export const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 