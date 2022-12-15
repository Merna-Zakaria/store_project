import { setupTestDatabase } from "../../utils/testUtils";
import { Order, OrderPrducts, OrderSrore } from "../order";
import { Product } from "../product";
import { User } from "../user";

const orderStore = new OrderSrore();
describe("order model", () => {

  let server: unknown;
  let dbResult;
  let userCreated: User;
  let productCreated: Product;
  let productPayload: Product;
  let orderCreated: Order;
  let orderPayload: Order;
  let token: string;

  beforeAll(async () => {

    server = require("../../server");
    dbResult = await setupTestDatabase();
    userCreated = dbResult.userCreated;
    productCreated = dbResult.productCreated;
    productPayload = dbResult.productPayload;
    orderCreated = dbResult.orderCreated;
    orderPayload = dbResult.orderPayload;
    token = dbResult.token;

  });

  it("create method should return order", async () => {
    expect(orderCreated.user_id).toBe(orderPayload.user_id);
  });

  it("add product method should return order", async () => {
    let product_id = JSON.stringify(productCreated.id);
    let quantity = 10;
    let order_id = JSON.stringify(orderCreated.id);
    const result: OrderPrducts = await orderStore.addProduct(
      quantity,
      order_id,
      product_id
    );
    expect(result.quantity).toEqual(10);
  });

  it("getCurrentOrder method should return last order", async () => {
    const result = await orderStore.getCurrentOrder(
      JSON.stringify(userCreated.id)
    );
    expect(result).toBeTruthy();
    expect(result?.products?.[0].quantity).toBe(
      orderPayload?.products?.[0].quantity
    );
  });

  it("getCompleteOrders method should return complete orders", async () => {
    const result = await orderStore.getCompleteOrders(
      JSON.stringify(userCreated.id)
    );
    expect(result).toEqual([]);
  });
});
