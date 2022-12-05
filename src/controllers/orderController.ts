import { Request, Response, NextFunction } from 'express'
import {Order, OrderSrore} from "../models/order"
import jwt, { Secret } from 'jsonwebtoken'
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
        const orderUser = await store.create(order)
        res.json(orderUser)
    } catch(err) {
        res.status(400)
        console.log(err)
        res.json(err)
    }
  }

export const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)
  
// get order to see if it is open
try {
    const ordersql = 'SELECT * FROM orders WHERE id=($1)'
    //@ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(ordersql, [orderId])

    const order = result.rows[0]

    if (order.status !== "open") {
      throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
    }

    conn.release()
  } catch (err) {
    throw new Error(`${err}`)
  }

  try {
    const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
    //@ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [quantity, orderId, productId])

    const order = result.rows[0]

    conn.release()

    return order
  } catch (err) {
    throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
  }
  } 