const express = require('express')
const app = express();
const port = process.env.PORT || 3000

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public/"))


const dotenv = require('dotenv')
dotenv.config();

const blogRoute = require("./routes/blogRoute.js")

app.use("",blogRoute)
app.get("/",(req,res)=>{
    res.render("home")
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