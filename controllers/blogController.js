exports.renderCreateBlog = (req,res)=>{
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    res.render('createBlog',{error,success})
}

exports.handleCreateBlog = (req,res)=>{
    const {title,subtitle,description} = req.body
    if(!title || !description || !subtitle){
        req.flash('error','please fil all field')
        res.redirect('/createBlog')
    }
}