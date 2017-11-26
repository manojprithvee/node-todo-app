const {ObjectID} = require("mongodb")
const {mongoose}=require("./../server/db/mongoose")
const {Todo}=require("./../server/models/todo")

var id = "5a1b0a650c33045e8fe83ce"

if(!ObjectID.isValid(id)){
    return console.log("ID not valid")
}
Todo.find({
    _id:id 
}).then((todos)=>{
    console.log('Todos',todos)   
})

Todo.findOne({
    _id:id 
}).then((todo)=>{
    console.log('Todo',todo)   
})
Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log("ID not Present")
    }
    console.log('TodoByID',todo)   
}).catch((e)=>{
    console.log(e)
})