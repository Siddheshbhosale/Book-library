const mongoose=require('mongoose');
// const {MONGOURI}=require('./keys');

// mongoose.connect(MONGOURI,{
//     useNewUrlParser : true,
//     useUnifiedTopology:true

// });
const {ObjectId}=mongoose.Schema.Types;



const postSchema =new mongoose.Schema({
    softcopy : {
        type :String,
        required :true
    },
    type:{
        type :String,
        required :true
    },
    bookname :{
        type :String,
        required :true
    },
    author :{
        type :String,
        required :true
    },
    rating :{
        type :String,
        required :true
    },
    photourl :{
        type :String,
        required :true
    }

},
{ timestamps: true })

mongoose.model("Post",postSchema);
