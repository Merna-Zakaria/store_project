import {Product, productSrore} from "../product"

const store = new productSrore()

describe('product model', () => {
    const product = {
        name: "test_product",
        price: 5,
    } 

    beforeAll(async () => {
        await store.create(product)
    })

    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })
    
    it('index method should return a list of products', async() => {
        const result = await store.index()
        expect(result.length).toBeGreaterThanOrEqual(1)
    })

    it('show should have an show method', () => {
        expect(store.show).toBeDefined()
    })

    it('show method should return product', async() => {
        const result = await store.show('1')
        expect(result.id).toEqual(1)
    })

    it('create method should return product', async() => {
        const product = {
            name: "test_product2",
            price: 10,
        }
        const result = await store.create(product)
        expect(result.name).toEqual("test_product2")
    })
})