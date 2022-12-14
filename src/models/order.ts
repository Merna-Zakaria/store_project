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
export type OrderPrducts = {
  id?: number;
  order_id: string;
  quantity: number;
  product_id: string;
};
export class OrderSrore {
  async index(): Promise<Product[] | undefined> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
        return result.rows;
    } catch (err) {
      throw new Error(`can not get orders list. ${err}`);
    }
  }

  async create(o: Order): Promise<Order | undefined> {
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
        conn.release();
        return order;
      }
    } catch (err) {
      throw new Error(`Could not add new order. ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderPrducts> {
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

  async getCurrentOrder(userId: string): Promise<Order | null> {
    let products, orderId;
    try {
      // const currentOrder: Order ;
      
      const conn = await Client.connect();
      const orderSql = "SELECT id FROM orders WHERE user_id = ($1)";

      // @ts-ignore
      const userIdList = await conn.query(orderSql, [userId]);
      if(userIdList.rows.length > 0){
        const currentOrderIndex = userIdList.rows.length - 1;
        orderId = userIdList.rows[currentOrderIndex]?.id;
        let sql = "SELECT * FROM order_products WHERE order_id = ($1)";
        const result = await conn.query(sql, [orderId]);
        products = result.rows;
        conn.release();
        const currentOrder = { id: orderId, user_id: userId, products: products?.map(pdt => ({id:pdt.product_id, quantity:pdt.quantity})) };
        return currentOrder
      }else{
        throw new Error(`This user do not have any order`);
      } 
    } catch (err) {
      throw new Error(`Could not get current order. ${err}`);
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
