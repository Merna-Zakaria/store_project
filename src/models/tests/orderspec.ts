import {Order, OrderSrore} from "../order"
import {Product, productSrore} from "../product"
import {User, UserSrore} from "../user"

const order_store = new OrderSrore()
const product_store = new productSrore()
const user_store = new UserSrore()

describe('order model', () => {
    const product = {
        name: "test_product",
        price: 5,
    } 
    const user = {
        first_name: "test_user",
        last_name: "test_user",
        password: "2345",
    } 

    let productResult: Product, userResult: User
    beforeAll(async () => {
       productResult =  await product_store.create(product)
       userResult =  await user_store.create(user)
    })

    // it('create method should return order', async() => {
    //     const order = {
    //         user_id: userResult.id,
    //         status: 'active',
    //         products: productResult,
    //     }
    //     const result = await order_store.create(order)
    //     expect(result.user_id).toEqual(userResult.id)
    // })
})