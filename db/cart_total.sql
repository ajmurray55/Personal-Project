SELECT SUM(total)
FROM cart
WHERE user_id = $1;
