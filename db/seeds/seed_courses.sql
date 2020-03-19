create table courses (
    course_id serial primary key,
    course varchar(250),
    img text,
    slopes json,
    address text,
    location json
)