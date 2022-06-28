const mongoose=require('mongoose');
// const {MONGOURI}=require('./keys');

// mongoose.connect(MONGOURI,{
//     useNewUrlParser : true,
//     useUnifiedTopology:true

// });

const adminSchema=new mongoose.Schema({
    name :{
        type :String,
        required :true
    },
    email :{
        type :String,
        required :true  
    },
    password : {
        type :String,
        required :true
    },
    resetToken:String,
    expireToken:Date,
    url :{
        type :String,
        default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Y2LJnaCmGkiNXrQ9BDNoWPljvdLT1308iw&usqp=CAU"
    },
    userType :{
        type :String,
        default :"admin101201301"
    }
})

mongoose.model("Admin",adminSchema);
