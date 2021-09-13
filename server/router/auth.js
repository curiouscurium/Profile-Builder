const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser');
// const Authenticate = require('../middleware/authenticate')
const User = require('../model/userSchema')
const verifyToken = require('../middleware/authenticate')

router.get('/',(req,res)=>{
    // res.cookie('test','aka'),
    res.send(`Hello from server`)
})

router.post('/register', async(req,res) => {

    const {name,email,password,confirmPassword} =req.body

    if(!name || !email || !password || !confirmPassword){
        return res.json("Fill all the fields")
    }
    
    try{
        const userPresent = await User.findOne({email:email})

        if(userPresent){
            return res.json({error:"User exists.Please Log in"})
        }else if(password != confirmPassword){
            return res.json({error:"password mismatch"})
            }else{
            const user = new User({name,email,password,confirmPassword})
            await user.save();
        }
         
        // await user.save();
        
        res.json({message:"User registerd successfully"})

    } catch(err){
        console.log(err);

    }
})


router.post('/login',async(req,res) => {
    // const{email,password} = req.body
    // console.log(req.body)
    // res.json({message:"awesome"})
    let token
    try{
        const {email,password} = req.body
        console.log(req.body)

        if(!email || !password){
            res.status(400).json({error :"Please fill data in it"})
        }

        const userLogin = await User.findOne({email:email})
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password)

            token = await  userLogin.generateAuthToken();
            console.log(token)
            
            // res.json("jwtoken",token,{

            //     domain: ".localhost:3000",
            //     path: "/login",
            //     expires: new Date(Date.now() + 100000),
            //     httpOnly:true
            // })

            // res.json({token})

            // console.log(req.cookies)
            
            if(!isMatch){
            // console.log(userLogin)
                res.status(400).json({error:'Enter the correct email and password'})
            }else{
                
                return res.json({message:'Login  Succesful',token})
            }
        }else{
                res.status(400).json({error:'Check your credentials'})   
        }

        

    
    }catch(err){
        console.log(err)
    }
});

router.get('/home',verifyToken,(req,res) =>{
    console.log("Hello Profile")
    res.send('Hi middleware')
})








module.exports = router