const jwt= require("jsonwebtoken")
const dotenv= require('dotenv')
dotenv.config()


const generateAccessToken= async (payload) =>{
    console.log('payload', payload)
    const access_token= jwt.sign({
        ...payload
    },process.env.ACCESS_TOKEN,{ expiresIn:'1d'})
    return access_token
}

const generateRefreshToken= async (payload) =>{
    const refresh_token= jwt.sign({
        payload
    },process.env.REFRESH_TOKEN,{ expiresIn:'365d'})
    return refresh_token
}

const jwtRefreshTokenService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('token', token);
            jwt.verify(token, process.env.REFRESH_TOKEN,async (err, user) => {
                if (err) {
                    console.log('err', err);
                    resolve({
                        status: 'error',
                        message: 'Authentication failed'
                    });
                }
                const access_token= await generateAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })  
                resolve({
                    status: 'OK',
                    message: 'Success!',
                    access_token
                });
            })
            
        } catch (e) {
            reject(e);
        }
    })
}




module.exports ={
    generateAccessToken,
    generateRefreshToken,
    jwtRefreshTokenService
}



