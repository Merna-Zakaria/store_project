const productRequest = require("supertest");
import { Product } from "../../models/product";

describe("product controller", () => {
  let server: unknown;
  let userRes: { _body: any; status: number };
  let token: string;
  let productCreated: { _body: any; status: number }
  const product = {
    name: "test_product",
    price: 5,
  };
  beforeAll(async () => {
    let user = {
      first_name: "m",
      last_name: "z",
      password: "1234",
    };
    server = require("../../server");
    userRes = await productRequest(server).post("/api/users").send({ user });
    token = `Bearer ${userRes._body?.token}`;

    productCreated = await productRequest(server)
      .post("/api/products")
      .send({ product })
      .set({ Authorization: token });
  });

  it("responds to get products list /api/products", async () => {
    let response = await productRequest(server).get("/api/products");
    expect(response.status).toEqual(200);
    expect(response._body.length).toBeGreaterThanOrEqual(1);
  });

  it("responds to /api/products/:id", async () => {
    let productsRes, singleProductRes;
    productsRes = await productRequest(server).get("/api/products");
    singleProductRes = await productRequest(server).get(
      `/api/products/${productsRes._body[0].id}`
    );

    expect(singleProductRes.status).toEqual(200);
    expect(singleProductRes._body.id).toEqual(productsRes._body[0].id);
  });

  it("responds to create product /api/products", async () => {
    expect(productCreated.status).toBe(200);
    expect(productCreated._body.name).toEqual(product.name);
    expect(productCreated._body.price).toEqual(product.price);
  });
});
