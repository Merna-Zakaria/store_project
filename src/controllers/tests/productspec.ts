import { setupTestDatabase } from "../../utils/testUtils"
const productRequest = require("supertest");
import { Product } from "../../models/product";

describe("product controller", () => {
  let server: unknown;
  let dbResult;
  let productCreated: Product;
  let productPayload: Product;
  let token: string;
  beforeAll(async () => {
    server = require("../../server");
    dbResult = await setupTestDatabase()
    productCreated = dbResult.productCreated;
    productPayload = dbResult.productPayload;
    token = dbResult.token
  });

  it("responds to get products list /api/products", async () => {
    let response = await productRequest(server).get("/api/products");
    expect(response.status).toEqual(200);
    expect(response._body.length).toBeGreaterThanOrEqual(1);
  });

  it("responds to /api/products/:id", async () => {
    let singleproductCreated = await productRequest(server).get(
      `/api/products/${productCreated.id}`
    );

    expect(singleproductCreated._body.id).toEqual(productCreated.id);
  });

  it("responds to create product /api/products", async () => {
    expect(productCreated.name).toEqual(productPayload.name);
    expect(productCreated.price).toEqual(productPayload.price);
  });
});

