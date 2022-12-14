import Client from "../database";
import bcrypt from "bcrypt";

export type Product = {
  id?: Number;
  name: string;
  price: Number;
};

export class productSrore {
  async index(): Promise<Product[] | undefined> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
        return result.rows;
    } catch (err) {
      throw new Error(`can not get products list. ${err}`);
    }
  }

  async show(id: string): Promise<Product | undefined> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if(result.rows[0].id){
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`);
    }
  }

  async create(p: Product): Promise<Product | undefined> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
     p.name, p.price
      ]);
      conn.release();
      if(result.rows[0]?.id){
        const product = result.rows[0];
        return product;
      }
    } catch (err) {
      throw new Error(`Could not add new product. ${err}`);
    }
  }

}