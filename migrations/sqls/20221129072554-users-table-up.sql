CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), password_digest text);
ALTER SEQUENCE users_id_seq RESTART WITH 1;
