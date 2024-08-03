exports.renderCreateBlog = (req,res)=>{
    res.render('createBlog')
}

exports.handleCreateBlog = (req,res)=>{
    console.log(req.body)
    res.send("submitted ")
}