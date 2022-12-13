const userRequest = require("supertest");

describe("user controller", () => {
  let server: unknown;
  let userRes: { _body: any; status: number}
  let token: string
  beforeAll(async function () {
    let user = {
        first_name: 'm',
        last_name: 'z',
        password: '1234'
    }
    server = require("../../server");
    userRes = await userRequest(server).post("/api/users").send({user});
    token =`Bearer ${userRes._body?.token}`
  });

  it("responds to get users list /api/users", async () => {
    let response
    //  response = await userRequest(server).get("/api/users");
    // expect(response.status).toEqual(401);
    // expect(JSON.parse(response.text)).toEqual('Access denied, invalid token');
    response = await userRequest(server).get("/api/users").set({ Authorization: token });
    expect(response.status).toEqual(200);
    expect(response._body.length).toBeGreaterThanOrEqual(1)

  });

  it("responds to /api/users/:id", async () => {
    let usersRes, singleUserRes
    usersRes = await userRequest(server).get("/api/users").set({ Authorization: token });
    singleUserRes = await userRequest(server).get(`/api/users/${usersRes._body[0].id}`).set({ Authorization: token });

    expect(singleUserRes.status).toEqual(200);
    expect(singleUserRes._body.id).toEqual(usersRes._body[0].id)

  });

  it("responds to create user /api/users", async () => {
    expect(userRes.status).toBe(200)
    expect(userRes._body.first_name).toEqual('m');
    expect(userRes._body.last_name).toEqual('z');

  });
});