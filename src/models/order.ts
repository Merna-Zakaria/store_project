import Client from "../database";

export type Product = {
  id: Number;
  quantity: number
}
export type Order = {
  id?: Number;
  user_id: Number;
  products: Array<Product>
  status: 'open' | 'complete';
};

export class OrderSrore {

  async create(o: Order,): Promise<Order> {
    // post /users --> create new user as signup feature
    try {
      const sqlOrderInfo =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
        
        // @ts-ignore
        const conn = await Client.connect();
        const result = await conn.query(sqlOrderInfo, [o.user_id, o.status]);
        const order = result.rows[0];
        if(order.id){
          let sql = o.products?.map(item => `(${item.quantity}, ${order.id}, ${item.id})`)
          const finalQuery = "INSERT INTO order_products (quantity, order_id, product_id) VALUES " + sql

        const result = await conn.query(finalQuery);
      }
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
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
}