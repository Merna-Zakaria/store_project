import { setupTestDatabase } from "../../utils/testUtils"
import {DashboardStore} from "../dashboard"
import {Order,OrderPrducts,  OrderSrore} from "../../models/order"
import {Product, productSrore} from "../../models/product"
import {User, UserSrore} from "../../models/user"

const store = new DashboardStore()


const order_store = new OrderSrore()
const product_store = new productSrore()
const user_store = new UserSrore()

describe('dashboard model', () => {
    // const product = {
    //     name: 'product_1',
    //     price: 5
    // } 
    // const user: User = {
    //     first_name: "test_user",
    //     last_name: "test_user",
    //     password: "2345",
    // } 

    // let productAdded: Product, userResult: User, orderAdded:Order,  order:Order
    // beforeAll(async () => {
    //     productAdded =  await product_store.create(product)
    //     userResult =  await user_store.create(user)
    //     order = {
    //      user_id: JSON.stringify(userResult.id),
    //      status: 'active',
    //      products: [{id: JSON.stringify(productAdded.id), quantity: 5}],
    //  }
    // orderAdded = await order_store.create(order)
    // })

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
   it('productsInOrders method should return list of products in orders', async() => {
    const result = await store.productsInOrders()
    expect(result).not.toEqual([])
    expect(result.length).toBeGreaterThan(0)
})
})