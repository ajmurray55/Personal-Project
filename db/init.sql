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
    image TEXT,
    screen_price NUMERIC(5,2),
    battery_price NUMERIC(5,2)
);  

CREATE TABLE cart(
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    phone_id INT REFERENCES phones(phone_id),
    screen BOOLEAN default false,
    battery BOOLEAN default false,
    total MONEY
);