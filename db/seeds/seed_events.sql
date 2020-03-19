create table events (
    event_id serial primary key,
    course_id int references courses(course_id),
    event_date date,
    describle text
)