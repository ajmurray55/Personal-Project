CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password TEXT NOT NULL, 
    email VARCHAR(50) NOT NULL
);

INSERT INTO users (username, password, email)
VALUES
('ajmurray55', 'ajm', 'ammonmurray1@gmail.com')