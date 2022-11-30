import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRESS_PASSWORD, POSTGRES_TEST_DB, ENV } =
  process.env;

let Client = new Pool ;

if(ENV === 'test'){
  Client = new Pool({
   host: POSTGRES_HOST,
   database: POSTGRES_DB,
   user: POSTGRES_USER,
   password: POSTGRESS_PASSWORD,
 });
}

if(ENV === 'dev'){
  Client = new Pool({
   host: POSTGRES_HOST,
   database: POSTGRES_TEST_DB,
   user: POSTGRES_USER,
   password: POSTGRESS_PASSWORD,
 });
}

export default Client;
