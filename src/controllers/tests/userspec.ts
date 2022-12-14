import { User } from "../../models/user";
import { setupTestDatabase } from "../../utils/testUtils"
const userRequest = require("supertest");

describe("user controller", () => {
  let server: unknown;
  let dbResult;
  let userRes: User;
  let userPayload: User;
  let token: string;
  beforeAll(async () => {
    server = require("../../server");
    dbResult = await setupTestDatabase()
    userRes = dbResult.userCreated;
    userPayload = dbResult.userPayload;
    token = dbResult.token
    
  });

  it("should get users list /api/users", async () => {
    let response
    //  response = await userRequest(server).get("/api/users");
    // expect(response.status).toEqual(401);
    // expect(JSON.parse(response.text)).toEqual('Access denied, invalid token');
    response = await userRequest(server).get("/api/users").set({ Authorization: token });
    expect(response.status).toEqual(200);
    expect(response._body.length).toBeGreaterThanOrEqual(1)

  });

  it("should get single user  /api/users/:id", async () => {
    let singleUserRes = await userRequest(server).get(`/api/users/${userRes.id}`).set({ Authorization: token });
    expect(singleUserRes.status).toEqual(200);
    expect(singleUserRes._body.id).toEqual(userRes.id)

  });

  it("should create user /api/users", async () => {
    expect(userRes.first_name).toEqual(userPayload.first_name);
    expect(userRes.last_name).toEqual(userPayload.last_name);

  });
});