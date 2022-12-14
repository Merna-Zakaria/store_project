CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
ALTER SEQUENCE orders_id_seq RESTART WITH 1;