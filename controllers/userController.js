const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
//@desc sigin up a user
//@route GET /api/users/signup
//@access public
const registerUser = asyncHandler(async (req,res)=>{
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400)
            throw new Error("All fields are mandatory")
        }
        const userAvailable = await User.findOne({email})
        if(userAvailable){
            res.status(400)
            throw new Error("User already register")
        }
        //hash password
        const hasPass = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password:hasPass
        })
        if(user){
            res.status(201).json({response:true})
        }
        else{
            res.status(401).json({response:false})
        }

    }
)

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"50m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("email or pasword is not vaild")
    }
})


module.exports = {registerUser,loginUser}


