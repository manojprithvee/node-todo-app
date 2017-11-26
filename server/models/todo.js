mongoose=require("mongoose");
var Todo=mongoose.model('Todo',
{
    text:{
        type: String,
        required: true,
        minlength:2,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    completedAt:{
        type: Number,
        default:null
    }
}
);
// var newTodo=new Todo({text:"   mmmmmmm      "});
// newTodo.save().then((result)=>{
//     console.log("Saved Todo",result)
// },(err)=>{
//     console.log("Unable to save",err)
// });
module.exports={Todo}