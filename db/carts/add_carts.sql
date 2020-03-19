insert into carts(user_id, product_id, quantity)
values (${id}, ${product_id}, ${quantity});

-- select product_id, sum(quantity) as quantity from carts
-- group by product_id;

select * from carts;