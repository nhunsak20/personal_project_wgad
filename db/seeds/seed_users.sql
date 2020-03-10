create table users (
    user_id serial primary key,
    username varchar(200) null,
    email varchar(250) not null,
    password varchar(200) not null
);