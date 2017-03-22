delete from tacos
  where id = $1
  returning *;
