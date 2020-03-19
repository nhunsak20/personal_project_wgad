update carts
set quantity = $2
where product_id = $1;

select * from carts;