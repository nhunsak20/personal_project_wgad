insert into events (course_id, event_date, describle)
values (${course_id}, ${date}, ${describle})
returning *;