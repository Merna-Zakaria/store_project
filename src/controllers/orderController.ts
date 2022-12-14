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
          // console.log('req.body', req.body)
        res.json(orderCreated)
    } catch(err) {
      res.json(
        `Could not add order. Error_controller: ${err}`
      );
      res.status(400);
    }
  }

  export const addProduct = async (_req: Request, res: Response) => {
    const orderId: string  = _req.params.id
    const productId: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.json(
        `Could not add product. Error_controller: ${err}`
      );
      res.status(400);
    }
  } 

  export const getCurrentOrder = async (_req: Request, res: Response) => {
    const userId: string = _req.params.userId
  
    try {
      const currentOrder = await store.getCurrentOrder(userId)
      // console.log('controller',currentOrder, userId)
      res.json(currentOrder)
    } catch(err) {
      console.log('error', err)
      res.json(
        `Could not find current order. Error_controller: ${err}`
      );
      res.status(400);
    }
  } 
  

  export const getCompleteOrders = async (_req: Request, res: Response) => {
    const userId: string = _req.params.userId
  
    try {
      const completeOrders = await store.getCompleteOrders(userId)
      res.json(completeOrders)
    } catch(err) {
      res.json(
        `Could not find compelete orders. Error_controller: ${err}`
      );
      res.status(400);
    }
  }