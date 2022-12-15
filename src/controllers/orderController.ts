import { Request, Response, NextFunction } from 'express'
import {Order, OrderSrore} from "../models/order"
import dotenv from "dotenv";

dotenv.config();

const store = new OrderSrore()

export const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const create = async (req: Request, res: Response) => { 
    try {
      const {user_id, products, status} = req.body;
      if(user_id && products && status){
        const order = {
             user_id,
             products,
             status
           };
           const orderCreated = await store.create(order)
         res.json(orderCreated)
      }else{
        throw new Error(`Could not add new order.`);
      }
    } catch(err) {
      res.status(400).json(`${err}`);
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
      res.status(400).json(`${err}`);
    }
  } 

  export const getCurrentOrder = async (_req: Request, res: Response) => {
    const userId: string = _req.params.userId
  
    try {
      const currentOrder = await store.getCurrentOrder(userId)
      res.status(200).json(currentOrder)
    } catch(err) {
      res.status(400).json(`${err}`);
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