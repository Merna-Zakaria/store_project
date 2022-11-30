import Client from "../database";

export type User = {
    id: Number;
    first_name: string;
    seconde_name: string;
    password: string
}

export class UserSrore {
 async index ():Promise<User[]> { // GET /users --> Get all users list
    try{
   const conn = await Client.connect();
   const sql = "SELECT * FROM users";
   const result = await conn.query(sql);
   conn.release();
   return result.rows
    }catch(err){
     throw new Error (`can not get users ${err}`)
    }
 }
 async show(id: string): Promise<User> {  // GET /users/:id --> Get single user
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {  // post /users --> create new user
      try {
    const sql = 'INSERT INTO users (first_name, second_name, password) VALUES(jojo, m, 2410) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.first_name, b.seconde_name, b.password])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user. Error: ${err}`)
      }
  }

//   async edit(id: string): Promise<User> {  // PUT OR PATCH /users/:id --> update single user
//     try {
//     const sql = 'SELECT * FROM users WHERE id=($1)'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn.query(sql, [id])

//     conn.release()

//     return result.rows[0]
//     } catch (err) {
//         throw new Error(`Could not find user ${id}. Error: ${err}`)
//     }
//   }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }
}