import {Product, productSrore} from "../product"
import { setupTestDatabase } from "../../utils/testUtils";

const store = new productSrore()

describe('product model', () => {
    // const product = {
    //     name: "test_product",
    //     price: 5,
    // } 
    // let productCreated: Product 
    // beforeAll(async () => {
    //     productCreated =  await store.create(product)
    // })
    let dbResult;
    let productRes: Product;
    let productPayload: Product;
  
    beforeAll(async () => {
      dbResult = await setupTestDatabase();
      productRes = dbResult.productCreated;
      productPayload = dbResult.productPayload;
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })
    
    it('index method should return a list of products', async() => {
        const result = await store.index()
        expect(result?.length).toBeGreaterThanOrEqual(1)
    })

    it('show should have an show method', () => {
        expect(store.show).toBeDefined()
    })

    it('show method should return product', async() => {
        const pdtId = productRes.id
        const result = await store.show(JSON.stringify(pdtId))
        expect(result?.id).toEqual(pdtId)
    })

    it('create method should return product', async() => {
        const product = {
            name: "test_product2",
            price: 10,
        }
        const result = await store.create(product)
        expect(result?.name).toEqual("test_product2")
    })
})