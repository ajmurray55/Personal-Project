CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password TEXT NOT NULL, 
    email VARCHAR(50) NOT NULL
);

CREATE TABLE phones(
    phone_id SERIAL PRIMARY KEY,
    manufacturer VARCHAR(15),
    model VARCHAR(40),
    color VARCHAR(20),
    image TEXT
);  