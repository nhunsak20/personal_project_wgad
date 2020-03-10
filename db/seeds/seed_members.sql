create table members (
    user_id integer foreign key references users(user_id),
    isActive boolean,
    isBoard boolean,
    isAdmin boolean
)