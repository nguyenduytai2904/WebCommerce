
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv")
dotenv.config()


const authMiddleware= (req,res,next) =>{
    console.log('checktoken',req.headers.token)
    const token= req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err){
            return res.status(404).json({
                status:'error',
                message: 'Authentication fail'
            })
        }
        if(user?.isAdmin)
        {
            next()
        }else{
            return res.status(404).json({
                status:'error',
                message: 'You dont have permission'
            })
        }
    });
}

const authUserMiddleware= (req,res,next) =>{
    const token= req.headers.token.split(' ')[1]
    const userid= req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err){
            return res.status(404).json({
                status:'error',
                message: 'Authentication fail'
            })
        }
        console.log('access',user)
        if(user?.isAdmin || user?.id === userid)
        {
            next()
        }else{
            return res.status(404).json({
                status:'error',
                message: 'You dont have permission'
            })
        }
    });
}

module.exports ={
    authMiddleware,
    authUserMiddleware
}