const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const connectionString = "postgres://macuser@localhost/macuser";
const massiveConnect = massive.connectSync({connectionString : connectionString});
const app = express();
const port = 3000;


app.use(json());
app.use(cors());
app.use(session({secret : 'keyboard cat'}));
app.set('db' , massiveConnect)
const db = app.get('db')


//
// db.creat(['texan taco', 'from tx', 4, 'txurl'], function (err , newTaco ){
//   console.log(err);
//   console.log(newTaco);
// });
//
// db.readTaco('beef taco' , function(err , taco){
//   console.log(taco);
//   console.log(err);
// })
// db.readall(function(err , all){
//   console.log(all);
//   console.log(err);
// })
// db.update([1,'cool' ], function(err , updated){
//   console.log(err);
//   console.log(updated);
// })
// db.delete([4], function(err , deleted){
//   console.log(deleted);
//   console.log(err);
//
// });

app.get('/', function (req, res){

  db.readall(function(err , all){
    console.log(all);
    console.log(err);
    res.send(all)
  })
})
app.post('/' , function (req ,res ){
  db.creat([req.body.name, req.body.descr, req.body.price, req.body.img_url], function (err , newTaco ){
    console.log(err);
    console.log(newTaco);
    if (err) return res.status(500).json(err)
    return res.status(200).json(newTaco)
  })
});
app.put('/' , function(req,res){

  db.update([req.body.id , req.body.descr], function (err , updated){
      console.log(err);
      console.log(updated);
      if(err){
        return res.status(500).json(err)
      }
      return res.status(200).json(updated)
    })
})
app.delete( '/api/:id' , function (req ,res){


  db.delete(req.params.id, function(err , deleted){
    if(err){
     console.log(err);
     return res.status(500).json(err)
   }
   console.log(deleted);
   return res.status(200).json(deleted)
 })
 })

app.listen(port , () => {
  console.log(`listenin' to prot ${port}`);
});
