const jwt = require('jsonwebtoken')
const {promisify} = require('util');
const { users } = require('../model');


exports.isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
    if(!token || token === null || token === undefined){
        req.flash('error','token invalid')
        return res.redirect('/login')
    }
   const decryptedResult = await promisify(jwt.verify)(token,process.env.SECRETKEY)
    console.log(decryptedResult)
    const data = await users.findByPk(decryptedResult.id)
    if(!data){
        
        req.flash('error','invalid user')
        res.redirect("/login")
    }
    req.userId = data.id
    req.userName = data.username
    console.log("req",req.userId)
    next()
    } catch (error) {
        console.log(error)
    }
}