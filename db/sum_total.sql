SELECT SUM(screen_price + battery_price)
FROM phones
WHERE phone_id = $1;