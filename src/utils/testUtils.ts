const request = require("supertest");
const server = require("../server");

export const setupTestDatabase = async () => {
    let userPayload = {
        first_name: 'user_test',
        last_name: 'user_test',
        password: '1234'
    }
    let productPayload = {
        name: "product_test",
        price: 5,
      };

    const userRes = await request(server).post("/api/users").send({...userPayload});
    const userCreated = userRes._body
    const token =`Bearer ${userCreated.token}`

 const productRes = await request(server).post("/api/products").send({...productPayload}).set({ Authorization: token });
 console.log('jjjjjjjjj', productRes)
 const productCreated = productRes._body
 const result = {
        userPayload,
        userCreated,
        token,
        productPayload,
        productCreated
    }
    return result;
}