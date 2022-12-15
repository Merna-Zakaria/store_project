import {Product, productSrore} from "../product"
import { setupTestDatabase } from "../../utils/testUtils";

const store = new productSrore()

describe('product model', () => {
    let dbResult;
    let productCreated: Product;
    let productPayload: Product;
  
    beforeAll(async () => {
      dbResult = await setupTestDatabase();
      productCreated = dbResult.productCreated;
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
        const pdtId = productCreated.id
        const result = await store.show(JSON.stringify(pdtId))
        expect(result?.id).toEqual(pdtId)
    })

    it('create method should return product', async() => {
        const result = await store.create(productPayload)
        expect(result?.name).toEqual(productPayload.name)
    })
})