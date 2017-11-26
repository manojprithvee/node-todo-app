var express = require("express");
var BodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
app.use(BodyParser.json());
app.post("/todos",(req,res)=>{
    new Todo({text:req.body.text}).save().then((doc)=>{
        res.send(JSON.stringify(doc))
    },(err)=>{
        res.status(400).send(err)
    })
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
});
