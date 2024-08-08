const { blogs } = require("../model")

exports.isValidUser = async(req,res,next)=>{
    const userId = req.userId
    const id = req.params.id

    const [data] = await blogs.findAll({
        where:{
            id
        }
    })
    if(userId != data.userId){
        req.flash('error','you are not valid user')
        return res.redirect(`/blogDetail/${id}`)
    }
    next()

}