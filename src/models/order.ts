import Client from "../database";

export type Product = {
  id: Number;
  quantity: number
}
export type Order = {
  id?: Number;
  user_id: Number;
  products: Array<Product>
  status: 'active' | 'complete';
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
      // console.log('result', result)
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
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