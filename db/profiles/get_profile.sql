select p.profile_img
from profiles p
join users u on p.user_id = u.user_id
where u.user_id = $1