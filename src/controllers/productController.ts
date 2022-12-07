import { Request, Response, NextFunction } from "express";
import { Product, productSrore } from "../models/product";

const store = new productSrore();

export const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.json(`can not get products from model. Error_controller: ${err}`);
    res.status(400);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.json(
      `Could not find product ${req.params.id}. Error_controller: ${err}`
    );
    res.status(400);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(user);
    res.json(newProduct);
  } catch (err) {
    res.json(`Could not add new product. Error_controller: ${err}`);
    res.status(400);
  }
};
