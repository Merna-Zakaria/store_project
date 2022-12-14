import { setupTestDatabase } from "../../utils/testUtils"
const productRequest = require("supertest");
import { Product } from "../../models/product";

describe("product controller", () => {
  let server: unknown;
  let dbResult;
  let productRes: Product;
  let productPayload: Product;
  let token: string;
  beforeAll(async () => {
    server = require("../../server");
    dbResult = await setupTestDatabase()
    productRes = dbResult.productCreated;
    productPayload = dbResult.productPayload;
    token = dbResult.token
  });

  it("responds to get products list /api/products", async () => {
    let response = await productRequest(server).get("/api/products");
    expect(response.status).toEqual(200);
    expect(response.length).toBeGreaterThanOrEqual(1);
  });

  it("responds to /api/products/:id", async () => {
    let singleProductRes = await productRequest(server).get(
      `/api/products/${productRes.id}`
    );

    expect(singleProductRes._body.id).toEqual(productRes.id);
  });

  it("responds to create product /api/products", async () => {
    console.log('productRes', productRes)
    expect(productRes.name).toEqual(productPayload.name);
    expect(productRes.price).toEqual(productPayload.price);
  });
});

