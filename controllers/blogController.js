const { blogs } = require("../model")

exports.renderCreateBlog = (req,res)=>{
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    res.render('createBlog',{error,success})
}

exports.handleCreateBlog = async(req,res)=>{
    const {title,subtitle,description} = req.body
    if(!title || !description || !subtitle){
        req.flash('error','please fil all field')
        res.redirect('/createBlog')
    }
    const data = await blogs.create({
        title,
        subtitle,
        description
    })
    req.flash('success','blog created successfully')
    res.redirect("/")
}

exports.renderBlogDetailPage = async(req,res)=>{
    const id = req.params.id
    const blog = await blogs.findOne({
        where:{
            id:id
        }
    })
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    res.render("blogDetail",{blog,error,success})
}

exports.handleDeleteBlog = async(req,res)=>{
    const id = req.params.id
    await blogs.destroy({
        where:{
            id:id
            }
            })
            req.flash('success','Deleted Successfully')
            res.redirect('/')
}

exports.renderEditPage = async(req,res)=>{
    const id = req.params.id
    const blog = await blogs.findOne({
        where:{
            id:id
            }
            })
            const [error] = req.flash('error')
            const [success] = req.flash('success')
            res.render('editBlog',{blog,error,success})
}

exports.handleEditBlog = async(req,res)=>{
            const {id} = req.params
            const {title,subtitle,description} = req.body
            if(!title || !description || !subtitle){
                req.flash('error','please fil all field')
                res.redirect(`/editBlog/${id}`)
                }
            await blogs.update({
                title:title,
                subtitle:subtitle,
                description:description
                },
                {
                    where:{
                        id:id
                        }
            })
            req.flash('success','Updated Successfully')
            res.redirect(`/blogDetail/${id}`)

}