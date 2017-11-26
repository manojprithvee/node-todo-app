// const MongoClient = require("mongodb").MongoClient
const {MongoClient,ObjectID} = require("mongodb")
// console.log(new ObjectID())
MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
if(err){
    return console.log("Unable to connect to mongodb "+err)
}
console.log("connected to mongodb");
// db.collection("Todos").find({_id:new ObjectID("5a1aa6d40f5f1f664107ba54")}).toArray().then((docs)=>{   //use object id to fetch
db.collection("Users").find({ name:"Ashwin"}).toArray().then((docs)=>{  //use key value pairs to query
    console.log("Todos")
    console.log(JSON.stringify(docs));
},(err)=>{
    console.log("unable to fetch docs");
});

// db.collection("Todos").find().count().then((count)=>{
//     console.log(`Todos count is ${count}`)
//     // console.log(JSON.stringify(docs));
// },(err)=>{
//     console.log("unable to fetch docs");
// });




// db.collection("Todos").insertOne(
//     {text:'dfghvh',
//     completed:"false"
//     },
//     (err,result)=>{
//         if(err){
//             return console.log("Error: Mongo insert - ",err)
//         }
//         console.log(JSON.stringify(result.ops,undefined,2))
//         console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2))
//     }
// );
// db.close();
});