delete from carts
where product_id = $1;

select * from carts;
-- select product_id, sum(quantity) as quantity from carts
-- group by product_id;