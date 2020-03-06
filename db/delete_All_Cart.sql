DELETE FROM cart 
WHERE user_id = $1;

SELECT * FROM cart
WHERE user_id = $1;