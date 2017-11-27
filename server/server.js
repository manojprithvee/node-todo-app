const env = process.env.NODE_ENV || "development";

if(env==="development"){
    process.env.PORT=3000
    process.env.MONGODB_URI="mongodb://localhost:27017/TodoApp"
}else if(env==="test"){
    process.env.PORT=3000
    process.env.MONGODB_URI="mongodb://localhost:27017/TodoAppTest"
}

const _ = require("lodash")
const express = require("express");
const BodyParser = require("body-parser");
const {ObjectID} = require("mongodb")

require("./db/mongoose");
var {Todo} = require("./models/todo");
// var {User} = require("./models/user");

var app = express();
app.use(BodyParser.json());
app.post("/todos",(req,res)=>{
    new Todo({text:req.body.text}).save().then((doc)=>{
        res.send(doc)
    },(err)=>{
        res.status(400).send(err)
    })
});

app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos,errorMessage:null})
    },(err)=>{
        res.status(400).send(err)
    })
});

app.get("/todos/:id",(req,res)=>{
    var id=req.params.id;
    if (!ObjectID.isValid(id))
    {
        return res.status(404).send({errorMessage:"ID is not Vaild"})
    }
    Todo.findById(id).then((todo)=>{
        if (!todo){
            return res.status(404).send({todo,errorMessage:"ID is not Present"})
        }
        res.send({todo,errorMessage:null})
    },(error)=>{
        res.send({todo:null,errorMessage:"Unexpected error"})
    })

});
app.delete("/todos/:id",(req,res)=>{
    var id=req.params.id;
    if (!ObjectID.isValid(id))
    {
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if (!todo){
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((error)=>{
        res.send()
    })

});

app.patch("/todos/:id",(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body, ["text","completed"]);
    if (!ObjectID.isValid(id))
    {
        return res.status(404).send()
    }
    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt=new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if (!todo){
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((error)=>{
        res.status(400).send()
    })
});
app.listen(process.env.PORT||3000,()=>{
    console.log(`Server running on ${env} port ${process.env.PORT||3000}`,)
});

module.exports={
    app
}
