select * from events e
join courses c on e.course_id = c.course_id
where event_id = $1