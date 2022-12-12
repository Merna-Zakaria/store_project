import {DashboardQueries} from "../dashboard"
import {Order,OrderPrducts,  OrderSrore} from "../../models/order"
import {Product, productSrore} from "../../models/product"
import {User, UserSrore} from "../../models/user"

const store = new DashboardQueries()


const order_store = new OrderSrore()
const product_store = new productSrore()
const user_store = new UserSrore()

describe('dashboard model', () => {
    const product = {
        name: 'product_1',
        price: 5
    } 
    const user: User = {
        first_name: "test_user",
        last_name: "test_user",
        password: "2345",
    } 

    let productAdded: Product, userResult: User, orderAdded:Order,  order:Order
    beforeAll(async () => {
        productAdded =  await product_store.create(product)
        userResult =  await user_store.create(user)
        order = {
         user_id: JSON.stringify(userResult.id),
         status: 'active',
         products: [{id: JSON.stringify(productAdded.id), quantity: 5}],
     }
    orderAdded = await order_store.create(order)
    })

    it('create method should return order', async() => {
        expect(orderAdded.user_id).toBe(order.user_id)
    })

    it('add product method should return order', async() => {
         let product_id = JSON.stringify(productAdded.id)
         let quantity = 10
         let order_id = JSON.stringify(orderAdded.id)

        const result:OrderPrducts = await order_store.addProduct(quantity, order_id, product_id )
        expect(result.quantity).toEqual(10)
    })

    it('getCurrentOrder method should return last order', async() => {
       const result = await order_store.getCurrentOrder(JSON.stringify(userResult.id))
       expect(result).toBeTruthy()
       expect(result?.products?.[0].quantity).toBe(5)
   })

   it('productsInOrders method should return list of products in orders', async() => {
    const result = await store.productsInOrders()
    expect(result).not.toEqual([])
    expect(result.length).toBeGreaterThan(0)
})
})