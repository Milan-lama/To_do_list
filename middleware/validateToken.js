const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')
const validateToken = asyncHandler(async (req,res,next)=>{
    let accessToken
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decode)=>{
            if(err){
                res.status(401)
                throw new Error("user is not authorized")
            }
            req.user = decode.user
            next()
        })
        if(!token){
            res.status(401)
            throw new Error("user is not authorized")
        }
    }
})

module.exports = validateToken