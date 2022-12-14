import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: Number;
  first_name: string;
  last_name: string;
  password: string;
  token?: string
};

export class UserSrore {
  async index(): Promise<User[] | undefined> {
    // GET /users --> Get all users list
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
        return result.rows;
    } catch (err) {
      throw new Error(`can not get users list. ${err}`);
    }
  }
  async show(id: string): Promise<User | undefined> {
    // GET /users/:id --> Get single user
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if(result.rows[0].id){
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find user ${id}. ${err}`);
    }
  }

  async create(u: User): Promise<User | undefined> {
    // post /users --> create new user as signup feature
    try {
     
        const sql =
          "INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *";
        const hash = bcrypt.hashSync(
          u.password + process.env.BCRYPT_PASSWORD,
          parseInt(process.env.SALT_ROUNDS as string)
        );
        // @ts-ignore
        const conn = await Client.connect();
        const result = await conn.query(sql, [
          u.first_name,
          u.last_name,
          hash,
        ]);
        conn.release();
        if(result.rows[0]?.id){
          const user = result.rows[0];
          return user;
        }
      
    } catch (err) {
      throw new Error(`Could not add new user. ${err}`);
    }
  }

  async authenticate(u: User): Promise<User | undefined> {
    // as signin feature
    try{
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM users WHERE first_name=($1) AND last_name=($2)";
      const result = await conn.query(sql, [u.first_name, u.last_name]);
  
      if (result.rows[0].id) {
        const user = result.rows[0];
        if (
          bcrypt.compareSync(
            u.password + process.env.BCRYPT_PASSWORD,
            user.password_digest
          )
        ) {
          return user;
        }else{
          throw new Error(`Invalid password entered`);
        }
      }
      conn.release();
    }catch(err){
      throw new Error(`Invalid data entered. ${err}`);
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

  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error_model: ${err}`);
    }
  }
}
