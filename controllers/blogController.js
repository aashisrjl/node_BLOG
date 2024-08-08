const { DataTypes, QueryTypes } = require("sequelize")
const { blogs, users,sequelize } = require("../model")
const fs = require('fs')

exports.renderCreateBlog = (req,res)=>{
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    res.render('createBlog',{error,success})
}

exports.handleCreateBlog = async(req,res)=>{
    const {title,subtitle,description} = req.body
    let image
    if(req.file){
        image =req.file.filename
    }else{
        image = ""
    }
    const userId = req.userId
    if(!title || !description || !subtitle){
        req.flash('error','please fil all field')
        res.redirect('/createBlog')
    }

    // using query to implement multinent architecture and create blog table for separate user
    await sequelize.query(`CREATE TABLE IF NOT EXISTS blog_${userId} (
        id int not null primary key auto_increment,
        title varchar(20),
        subtitle varchar(30),
        description varchar(100),
        imageUrl varchar(100),
        userId int references users(id))`,{
        type : QueryTypes.CREATE
    })

    // inserting data
    await sequelize.query(`INSERT INTO blog_${userId} (title,subtitle,description,imageUrl,userId) VALUES(?,?,?,?,?)`,{
        replacements : [title,subtitle,description,image,userId],
        type: QueryTypes.INSERT
    })
    
    const data = await blogs.create({
        title,
        subtitle,
        description,
        imageUrl: image,
        userId
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
    const userId = req.userId
   const [data] = await blogs.findAll({
    where:{
        id
    }
   })
//    if(data.userId != userId){
//     req.flash('error','you cant delete this ')
//     return res.redirect(`/blogDetail/${id}`)
//    }
   const fileName = data.imageUrl
    await blogs.destroy({
        where:{
            id:id,
            userId
            }
            })

            fs.unlink(`storage/${fileName}`,(err)=>{
                if(err){
                    console.log("error in file delete")
                }else{
                    console.log("file also deleted")
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
            const userId = req.userId
            let newFile
            if(req.file){
            newFile = req.file.filename
            console.log(req.file.filename)
            }else{
                newFile = ""
            }
            if(!title || !description || !subtitle){
                req.flash('error','please fil all field')
                res.redirect(`/editBlog/${id}`)
                }

                const [data] = await blogs.findAll({
                    where:{
                        id
                    }
                })
                const oldFile = data.imageUrl
                if(oldFile){
                    fs.unlink(`storage/${oldFile}`,(err)=>{
                        if(err){
                            console.log("error in file delete")
                        }else{
                            console.log("file also deleted")
                        }
                    })
                }
                // if(userId != data.userId){
                //     req.flash('error','you cant update this')
                //     return res.redirect(`/editBlog/${id}`)
                // }

            await blogs.update({
                title:title,
                subtitle:subtitle,
                description:description,
                imageUrl:newFile
                },
                {
                    where:{
                        id:id,
                        userId:userId
                        }
            })
            req.flash('success','Updated Successfully')
            res.redirect(`/blogDetail/${id}`)

}

exports.renderMyBlog = async(req,res)=>{
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    const userId = req.userId
    const data = await blogs.findAll({
        where:{
            userId:userId
        },
        include:{
            model:users,
        }
    })
    const userName = req.userName
    console.log("username",userName)
    res.render("myBlog",{error,success,data,userName})
}