import Client from "../database";

export type Product = {
  id: string;
  quantity: number;
};
export type Order = {
  id?: string;
  user_id: string;
  products?: Array<Product>;
  status?: "active" | "complete";
};

export class OrderSrore {
  async create(o: Order): Promise<Order> {
    try {
      const sqlOrderInfo =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";

      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sqlOrderInfo, [o.user_id, o.status]);
      const order = result.rows[0];
      if (order.id) {
        let sql = o.products?.map(
          (item) => `(${item.quantity}, ${order.id}, ${item.id})`
        );
        const finalQuery =
          "INSERT INTO order_products (quantity, order_id, product_id) VALUES " +
          sql;

        const result = await conn.query(finalQuery);
      }
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error_model: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    // get order to see if it is active
    try {
      const ordersql = "SELECT * FROM orders WHERE id=($1)";
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(ordersql, [orderId]);
      const order = result.rows[0];

      if (order.status !== "active") {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId} Error_model: ${err}`
      );
    }
  }

  async getCurrentOrder(userId: string): Promise<Order | undefined> {
    try {
      let currentOrder;
      const sql = "SELECT id FROM orders WHERE user_id = ($1)";

      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId]);
      const currentOrderIndex = result.rows?.length - 1;
      const orderId = result.rows[currentOrderIndex]?.id;
      if (orderId) {
        let sql = "SELECT * FROM order_products WHERE order_id = ($1)";
        const result = await conn.query(sql, [orderId]);
        const products = result.rows;
        console.log('orderId', orderId, 'products', products)
        currentOrder = { id: orderId, user_id: userId, products: products };
      }
      conn.release();
      return currentOrder;
    } catch (err) {
      throw new Error(`Could not get current order. Error_model: ${err}`);
    }
  }

  async getCompleteOrders(userId: string): Promise<Order[] | undefined> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";

      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId, 'complete']);
      const completeOrder = result.rows;
      return completeOrder;
    } catch (err) {
      throw new Error(`Could not get compelete orders. Error_model: ${err}`);
    }
  }
}
