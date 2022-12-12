import express, { Request, Response } from "express";
import { index } from "../userController"

const request = require("supertest");

describe("GET /api/images", () => {
  let server: unknown;
  let userRes: { _body: any; }
  let token: string
  beforeAll(async function () {
    let user = {
        first_name: 'm',
        last_name: 'z',
        password: '1234'
    }
    server = require("../../server");
    userRes = await request(server).post("/api/users", user);
    token =`Bearer ${userRes._body?.token}`
  });

  it("responds to /api/users", async () => {
    let response
     response = await request(server).get("/api/users");
    
    expect(response.status).toEqual(401);
    expect(JSON.parse(response.text)).toEqual('Access denied, invalid token');
    response = await request(server).get("/api/users").set({ Authorization: token });
    expect(response.status).toEqual(200);
    expect(response._body.length).toBeGreaterThanOrEqual(1)

  });

  it("responds to /api/users/:id", async () => {
    let usersRes, singleUserRes
    usersRes = await request(server).get("/api/users").set({ Authorization: token });
    singleUserRes = await request(server).get(`/api/users/${usersRes._body[0].id}`).set({ Authorization: token });
    console.log('response', singleUserRes._body)

    expect(singleUserRes.status).toEqual(200);
    expect(singleUserRes._body.id).toEqual(usersRes._body[0].id)

  });
//   it("404 everything else", async () => {
//     await request(server).get("/foo/bar").expect(404);
//   });
//   it("should respond with image/jpeg", async () => {
//     const response = await request(server)
//       .get("/api/images")
//       .query({ filename: "avatar", width: 100, height: 100 });
//     expect(response.status).toEqual(200);
//     expect(response.type).toBe("image/jpeg");
//     expect(response.headers["content-type"]).toMatch(/jpeg/);
//   });

//   it("test image not found", async () => {
//     const response = await request(server)
//       .get("/api/images")
//       .query({ filename: "", width: 100, height: 100 });
//     expect(response.status).toEqual(422);
//     expect(response.text).toBe("Please enter valid file name");
//   });
});