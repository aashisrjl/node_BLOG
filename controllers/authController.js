const { users } = require("../model");
const bcrypt = require('bcrypt');

exports.renderRegisterPage = (req,res)=>{
    const [error] = req.flash("error");
    const [success] = req.flash("success");
    res.render('auth/register');
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
    req.flash("success","User Register Successfully")
    res.redirect("/login")
}

exports.renderLoginPage = (req,res)=>{
    const [error] = req.flash("error");
    const [success] = req.flash("success");
    res.render('auth/login');
}

exports.handleLogin = async(req,res)=>{

}