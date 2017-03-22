update tacos
  set descr = $2
  where id = $1

  returning * ;
