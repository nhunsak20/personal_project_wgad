insert into users (email, password, profile_img)
values ($1, $2, $3) returning *;