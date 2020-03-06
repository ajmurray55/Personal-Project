DELETE FROM cart
WHERE cart_id = $1;

SELECT * FROM cart
WHERE user_id = $2;