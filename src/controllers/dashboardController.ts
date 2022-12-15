import express, { Request, Response } from "express";
import { DashboardStore } from "../services/dashboard";
const dashboard = new DashboardStore();

export const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (err) {
      res.send(err);
    res.status(400);
  }
};

export const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (err) {
    res.send(err);
    res.status(400);
  }
};

export const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.fiveMostExpensive();
    res.json(users);
  } catch (err) {
      res.send(err);
      res.status(400);
  }
};
