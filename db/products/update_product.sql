update products
set name = ${name}, price = ${price}, describle = ${describle}, img = ${img}
where product_id = ${id}
returning *;