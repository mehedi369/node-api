const request = require('request');
const express = require('express');
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
  res.render("search");
});

app.get("/results", (req, res)=>{
  // req.query.search will provide the searched item from the form
  console.log(req.query.search);
  let user_submit = req.query.search;
  let url = "https://www.omdbapi.com/?s=" + user_submit + "&apikey=thewdb";
  request(url, (error, response, body)=>{
    if(!error && response.statusCode == 200){
      /*
      the requst process give a string in the body
      res.send(body);
      for parse string to json
      the type of the body is string
      console.log(typeof body);
      */
      let data = JSON.parse(body);
      // console.log(typeof data);
      res.render("results", {data : data});
    }
  });
});

app.listen(3000, ()=>{
  console.log("Boss!Movie app is running on port: 3000");
});
