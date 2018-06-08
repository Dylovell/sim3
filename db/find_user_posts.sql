SELECT * FROM post
INNER JOIN users
    ON post.creator_id = users.id;