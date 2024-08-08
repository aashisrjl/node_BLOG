const express = require('express')
const app = express();
const port = process.env.PORT || 3000
require('./model/index.js')
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')
const dotenv = require('dotenv').config()

app.set("view engine","ejs")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public/"))
app.use(express.static('storage/'))

app.use(session({
    secret: 'nodeBlog',
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

app.use(async(req,res,next)=>{
    const token = req.cookies.token
    res.locals.isAuthenticated = token
    // const decryptedResult = await promisify(jwt.verify)(token,process.env.SECRETKEY)
    // if(decryptedResult){
    //     res.locals.isAuthenticated = true
    // }else{
    //     res.locals.isAuthenticated = false
    // }

    next()
})

const blogRoute = require("./routes/blogRoute.js");
const authRoute = require("./routes/authRoute.js")
const { blogs, users } = require('./model/index.js');


app.use("",blogRoute)
app.use("",authRoute)

app.get("/",async(req,res)=>{
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    const data = await blogs.findAll({
        include:
            {
                model: users
            }
        
    })
    
    res.render("home",{error,success,data})
})

app.get("/about",(re,res)=>{
    res.send("This is about page")
})

app.get("/contact",(re,res)=>{
    res.send("This is contact page")
})

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})