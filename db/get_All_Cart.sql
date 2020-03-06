SELECT * FROM cart 
INNER JOIN phones ON cart.phone_id = phones.phone_id
WHERE cart.user_id = $1;