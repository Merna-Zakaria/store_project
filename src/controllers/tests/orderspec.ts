const orderRequest = require("supertest");
import { Order, Product } from "../../models/order";
import { User } from "../../models/user";

describe("order controller", () => {
  let server: unknown;
  let userRes: User;
  let token: string;
  let productCreated: Product;
  let order: Order;
  let orderCreated: { _data: { order: Order } };
  const product = {
    name: "test_product",
    price: 15,
  };
  beforeAll(async () => {
    // let user = {
    //   first_name: "m",
    //   last_name: "z",
    //   password: "1234",
    // };
    // server = require("../../server");
    // userRes = await orderRequest(server).post("/api/users").send({ user });
    // token = `Bearer ${userRes._body?.token}`;

    // productCreated = await orderRequest(server)
    //   .post("/api/products")
    //   .send({ product })
    //   .set({ Authorization: token });

    //   order ={
    //     user_id: userRes._body.id,
    //     products: [{id: productCreated._body.id, quantity: 100}],
    //     status: "active"
    //   }
    //   orderCreated = await orderRequest(server)
    //   .post("/api/orders")
    //   .send({ order })
    //   .set({ Authorization: token });
    // //   console.log('orderCreated', orderCreated)

    let user = {
      first_name: "m",
      last_name: "z",
      password: "1234",
    };
    server = require("../../server");
    await orderRequest(server)
      .post("/api/users")
      .send({ user })
      .then(async (res: Response) => {
        userRes = JSON.parse(JSON.stringify(res.body));
        token = `Bearer ${userRes?.token}`;
        await orderRequest(server)
          .post("/api/products")
          .send({ product })
          .set({ Authorization: token })
          .then((pdtRes: Response) => {
            let productCreated = JSON.parse(JSON.stringify(pdtRes.body));
            order = {
              user_id: JSON.stringify(userRes?.id),
              products: [{ id: productCreated?.id, quantity: 100 }],
              status: "active",
            };
            let orderRes = orderRequest(server)
              .post("/api/orders")
              .send({ order })
              .set({ Authorization: token });
            orderCreated = orderRes._data.order;
          });
      });
  });

  it("responds to get getCurrentOrder  /api/orders/current/:userId", async () => {
    let response = await orderRequest(server)
      .get(`/api/orders/current/${userRes.id}`)
      .set({ Authorization: token });
    // console.log("test", response);
    // expect(response.status).toEqual(200);
    // expect(response._body.length).toBeGreaterThanOrEqual(1);
  });

  //   it("responds to /api/products/:id", async () => {
  //     let productsRes, singleProductRes;
  //     productsRes = await productRequest(server).get("/api/products");
  //     singleProductRes = await productRequest(server).get(
  //       `/api/products/${productsRes._body[0].id}`
  //     );

  //     expect(singleProductRes.status).toEqual(200);
  //     expect(singleProductRes._body.id).toEqual(productsRes._body[0].id);
  //   });

  //   it("responds to create product /api/products", async () => {
  //     expect(productCreated.status).toBe(200);
  //     expect(productCreated._body.name).toEqual(product.name);
  //     expect(productCreated._body.price).toEqual(product.price);
  //   });
});
