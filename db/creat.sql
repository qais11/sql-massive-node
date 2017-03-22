insert into tacos
  (name, descr ,price, img_url)
  values
  ($1,$2,$3,$4)
returning *;
