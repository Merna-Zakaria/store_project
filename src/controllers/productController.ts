import { Request, Response, NextFunction } from "express";
import { Product, productSrore } from "../models/product";

const store = new productSrore();

export const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {name, price} = req.body;
    if(name && price){
      const product = {
        name,
        price
      };
      const newProduct = await store.create(product);
      res.json(newProduct);
    }else{
      throw new Error(`Could not add new product.`);
    }
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};
