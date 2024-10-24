const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const Signin = async (req, res) => {
    try {

        const { email, password } = req.body
        console.log('req.body', req.body)

        console.log('req.body', email, password)
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is required'
            })
        } else if (!isEmail) {
            return res.status(400).json({
                status: 'error',
                message: 'Email invalid'
            })
        }

        const response = await UserService.Signin(req.body)
        const { refresh_token, ...newResponse } = response
        //console.log('response',respone)
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}

const createUser = async (req, res) => {
    try {

        const { email, password, confirmPassword } = req.body
        console.log('req.body', req.body)
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'The input is required'
            })
        } else if (!isEmail) {
            return res.status(400).json({
                status: 'error',
                message: 'Email invalid'
            })
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Password and confirmpassword aren\'t match'
            })
        }
        console.log('isEmail', isEmail)
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'Userid required'
            })
        }
        console.log('userid', userId)
        console.log('data', data)
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'Userid required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}


const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(400).json({
                status: 'error',
                message: 'ids required'
            })
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}

const getAllUser = async (req, res) => {
    try {

        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}

const getUserDetail = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 'error',
                message: 'Userid is required'
            })
        }
        const response = await UserService.getUserDetail(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}


const jwtRefreshTokenService = async (req, res) => {
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        console.log('req.cookies', req.cookies)
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(404).json({
                status: 'error',
                message: 'Token is required'
            })
        }
        const response = await JwtService.jwtRefreshTokenService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'ok',
            message: 'Logout success'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createUser,
    Signin,
    updateUser,
    deleteUser,
    getAllUser,
    getUserDetail,
    jwtRefreshTokenService,
    logoutUser,
    deleteMany

}