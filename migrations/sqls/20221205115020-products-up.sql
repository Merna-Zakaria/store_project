CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);
ALTER SEQUENCE products_id_seq RESTART WITH 1;
