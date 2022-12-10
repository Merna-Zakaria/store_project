import {User, UserSrore} from "../user"

const store = new UserSrore()

describe('user model', () => {
    const user = {
        first_name: "test",
        last_name: "test",
        password: "2345",
    } 

    beforeAll(async () => {
        const user:User = {
            id: 1,
            first_name: "merna",
            last_name: "zakaria",
            password: "1234",
        }
        await store.create(user)
    })

    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })
    
    it('index method should return a list of users', async() => {
        const result = await store.index()
        expect(result.length).toBeGreaterThanOrEqual(1)
    })

    it('should have an show method', () => {
        expect(store.show).toBeDefined()
    })

    it('show method should return user', async() => {
        const result = await store.show('1')
        expect(result.id).toEqual(1)
    })

    it('create method should return user', async() => {
        const user = {
            first_name: "test",
            last_name: "test",
            password: "2345",
        }
        const result = await store.create(user)
        expect(result.first_name).toEqual("test")
    })

    it('authenticate method should return user', async() => {
        const result = await store.authenticate(user)
        expect(result).not.toBeNull()
    })
//   it('delete method should remove the book', async () => {
//     store.delete("1");
//     const result = await store.index()

//     expect(result).toEqual([]);
//   });
})