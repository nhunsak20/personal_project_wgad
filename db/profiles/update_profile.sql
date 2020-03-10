update profiles
set name_first = $2,
name_last = $3
where user_id = $1
returning *;
