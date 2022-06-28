require('dotenv').config();
const express=require('express');
const { json } = require('express/lib/response');
const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const User=mongoose.model("User");
const Admin=mongoose.model("Admin");
const router=express.Router();
const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;
const requirelogin =require('../middleware/requirelogin');

const crypto = require('crypto')

router.post('/signup',(req,res)=>{

    console.log("inserver")
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
  const {name,email,password,url}=req.body;
 
  if(!(validateEmail(email)))
  {
      console.log("invalid email")
    return  res.status(422).json({error : "Invalid email"});
  }
  if(password.length <5) {
      console.log("l5")
    return res.status(422).json({error: "password is weak length should be greater than 5"});
}
  if(password.length >40) {
      console.log("l5")
    return res.status(422).json({error: "password is not valid"});
}
  if(name.length <2) {
      console.log("l5")
    return res.status(422).json({error: "name is not valid"});
}
  if(name.length >20) {
      console.log("l5")
    return res.status(422).json({error: "name is not valid"});
}
  if(!name || !password || !email)
  {
    console.log(req.body);
    return  res.status(422).json({error : "plese provide all details"});
  }
  else
  {
    // res.json({message : "signup succesful"});
    User.findOne({email : email}).
    then((savedUser)=>{
        if(savedUser)
        {
            res.status(422).json({error : "user already exists"});
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user=new User({
                email : email,
                name : name ,
                password : hashedpassword,
                url :url
            });
            user.save().then((users =>{
                res.status(200).json({message : "signup succesfully"});
            })).catch((err)=>{
                console.log(err);
            })
        })
    }).catch((err)=>{
        console.log(err);
    })

  }
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
       return res.status(422).json({error:"please fill all fields"});
    }
    User.findOne({email : email}).
    then(savedUser=>{
        if(!savedUser)
        {
         return    res.status(422).json({error:"Invalid email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(matched=>{
            if(matched)
            {
                //res.json({message : "sign in succesfully"})
                const token=jwt.sign({_id : savedUser._id},JWT_SECRET);
                const {_id,name,email,url}=savedUser;
            res.json({token,user :{_id,name,email,url}});
            }
            else
            {
                return  res.status(422).json({error:"Invalid email or password"}); 
            }
        })
        .catch(err=>{res.status(422).json({error:"Invalid email or password"});console.log(err);
            })
       
    })
})

router.post('/asignup',(req,res)=>{
    console.log("inserver")
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
  const {name,email,password,url,cred}=req.body;
 console.log(req.body);
  if(!(validateEmail(email)))
  {
      console.log("invalid email")
    return  res.status(422).json({error : "Invalid email"});
  }
  if(cred!="booksproject12345")
  {
    return res.status(422).json({error: "wrong company credintials"});
  }
  if(password.length <5) {
      console.log("l5")
    return res.status(422).json({error: "password is weak length should be greater than 5"});
}
  if(password.length >40) {
      console.log("l5")
    return res.status(422).json({error: "password is not valid"});
}
  if(name.length <2) {
      console.log("l5")
    return res.status(422).json({error: "name is not valid"});
}
  if(name.length >20) {
      console.log("l5")
    return res.status(422).json({error: "name is not valid"});
}
  if(!name || !password || !email)
  {
    console.log(req.body);
    return  res.status(422).json({error : "plese provide all details"});
  }
  else
  {
    // res.json({message : "signup succesful"});
    Admin.findOne({email : email}).
    then((savedUser)=>{
        if(savedUser)
        {
            res.status(422).json({error : "user already exists"});
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const admin=new Admin({
                email : email,
                name : name ,
                password : hashedpassword,
                url :url
            });
            admin.save().then((users =>{
                res.status(200).json({message : "signup succesfully"});
            })).catch((err)=>{
                console.log(err);
            })
        })
       
        
    }).catch((err)=>{
        console.log(err);
    })

  }
})


router.post('/alogin',(req,res)=>{
    const {email,password}=req.body;
    
    if(!email || !password)
    {
       return res.status(422).json({error:"please fill all fields"});
    }
    Admin.findOne({email : email}).
    then(savedUser=>{
        if(!savedUser)
        {
         return    res.status(422).json({error:"Invalid email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(matched=>{
            if(matched)
            {
                //res.json({message : "sign in succesfully"})
                const token=jwt.sign({_id : savedUser._id},JWT_SECRET);
                const {_id,name,email,url}=savedUser;
                
            res.json({token,user :{_id,name,email,url}});
            }
            else
            {
                return    res.status(422).json({error:"Invalid email or password"}); 
            }
        })
        .catch(err=>{res.status(422).json({error:"Invalid email or password"});console.log(err);
            })
       
    })
})


module.exports=router;