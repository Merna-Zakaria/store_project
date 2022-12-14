import { setupTestDatabase } from "../../utils/testUtils"
import { Order, Product } from "../../models/order";
import { User } from "../../models/user";
const orderRequest = require("supertest");

describe("order controller", () => {

    let server: unknown;
    let dbResult;
    let productRes: Product;
    let productPayload;
    let userRes: User;
    let token: string;
    beforeAll(async () => {
      server = require("../../server");
      dbResult = await setupTestDatabase()
      productRes = dbResult.productCreated;
      productPayload = dbResult.productPayload;
      userRes = dbResult.userCreated;
      token = dbResult.token
    
  });

  it("responds to get getCurrentOrder  /api/orders/current/:userId", async () => {
    let response = await orderRequest(server)
      .get(`/api/orders/current/${userRes.id}`)
      .set({ Authorization: token });
    expect(response.status).toEqual(200);
    expect(response._body.length).toBeGreaterThanOrEqual(1);
  });

});
