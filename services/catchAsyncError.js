exports.errorHandler= (fn)=>{
    return (req,res)=>{
        fn(req,res).catch((err)=>{
            return res.status(500).json({
                message:err.message,
                error:'internal/server error'
            })
        })
    }
}