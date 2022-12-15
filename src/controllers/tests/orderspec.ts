import { setupTestDatabase } from "../../utils/testUtils"
import { Order, Product } from "../../models/order";
import { User } from "../../models/user";
const orderRequest = require("supertest");

describe("order controller", () => {

    let server: unknown;
    let dbResult;
    let productRes: Product;
    let productPayload;
    let userCreated: User;
    let token: string;

    beforeAll(async () => {

      server = require("../../server");
      dbResult = await setupTestDatabase()
      productRes = dbResult.productCreated;
      productPayload = dbResult.productPayload;
      userCreated = dbResult.userCreated;
      token = dbResult.token
    
  });

  it("getCurrentOrder method should return last order /api/orders/current/:userId", async () => {
    let response = await orderRequest(server)
      .get(`/api/orders/current/${userCreated.id}`)
      .set({ Authorization: token });
    expect(response.status).toEqual(200);
    expect(response._body.user_id).toEqual(JSON.stringify(userCreated.id));
    expect(response._body.products.length).toBeGreaterThanOrEqual(1);
  });

});
