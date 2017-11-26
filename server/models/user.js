mongoose=require("mongoose");
var User=mongoose.model('User',
{
    email:{
        type: String,
        required: true,
        minlength:1,
        trim:true
    },
}
);
// var user=new User({})
// user.save().then((result)=>{
//         console.log("Saved Todo",result)
//     },(err)=>{
//         console.log("Unable to save",err)
//     }
// );
module.exports={User}