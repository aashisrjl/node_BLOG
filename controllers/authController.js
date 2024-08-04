const { users } = require("../model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../services/sendMail");

exports.renderRegisterPage = (req,res)=>{
    const [error] = req.flash("error");
    const [success] = req.flash("success");
    res.render('auth/register',{error,success});
}

exports.handleRegister = async(req,res)=>{
    const {username, email, password} = req.body
    if(!username || !email || ! password){
        req.flash("error","all fields are required")
        res.redirect("/register")
        return
    }
    users.create({
        username,
        email,
        password: await bcrypt.hashSync(password,8)
    })
    sendMail({
        email,
        subject: "Registered",
        text: `Dear ${username} are register to the nodeBlog project of aashis Rijal`
    })
    req.flash("success","User Register Successfully")
    res.redirect("/login")
}

exports.renderLoginPage = (req,res)=>{
    const [error] = req.flash("error");
    const [success] = req.flash("success");
    res.render('auth/login',{error,success});
}

exports.handleLogin = async(req,res)=>{
    const {email, password} = req.body
    const [user] = await users.findAll({
        where:{
            email:email
        }
    })

    if(user){
    const userMatch = await bcrypt.compare(password,user.password)

    if(userMatch){
        const token = jwt.sign({id:user.id},process.env.SECRETKEY,{
            expiresIn: "30d"
        })
        res.cookie("token",token);
        req.flash("success","Login Successfully")
        res.redirect("/")
    }else{
        req.flash("error","Invalid password");
        return res.redirect('/login') 
        
    }
    }else{
    req.flash("error","No user with this email");
    return res.redirect('/login')
}

//handle logout
exports.handleLogout = (req,res)=>{
    res.clearCookie("jwtToken");
    req.flash("success","logout successfully")
    res.redirect("/login");
    }



}