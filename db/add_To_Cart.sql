INSERT INTO cart
(user_id, phone_id, screen, battery, total)
VALUES
($1, $2, $3, $4, $5);

SELECT * FROM cart
WHERE user_id = $1 and phone_id = $2;