const authMiddleware = (req,res,next)=>{
    if (req.user){
        next()
    }else {
        res.redirect("/auth")
    }

}

module.exports =authMiddleware
