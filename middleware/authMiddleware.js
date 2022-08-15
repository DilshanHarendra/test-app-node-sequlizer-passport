const authMiddleware = (req,res,next)=>{
    if (!req.session?.user){
        next()
    }else {
        res.send({ message:'unauthorized'}).status(401)
    }

}

module.exports =authMiddleware
