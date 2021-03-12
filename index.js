const express = require('express');
const sss = require('./node_modules/sss/index.js');

app=express();
app.use(express.static(__dirname+"/public"));

app.get('/sample-api', (req, res) =>{
  res.json(sss);
});

app.listen(3000,function(error) {
  if (error) {
    console.log(error+"himanshu");
    } else {
    console.log("server started on Port: 3000");
  }
});
