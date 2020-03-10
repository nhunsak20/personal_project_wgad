insert into products (name, price, describle, img) 
values (${name}, ${price}, ${describle}, ${img})
returning *;