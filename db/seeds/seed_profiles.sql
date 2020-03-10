create table profiles (
    user_id int references users(user_id),
    first_name varchar(100),
    last_name varchar(100),
    age date,
    gender varchar(10),
    city varchar(100),
    state varchar(100)
)