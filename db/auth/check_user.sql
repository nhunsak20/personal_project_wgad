-- select * from users u
-- join members m on u.user_id = m.user_id
-- where u.email = $1;

select * from users
where email = $1