const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("./JwtService")


const Signin = (userSignin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userSignin
        try {

            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isEmail = reg.test(email)
            console.log('email', email)
            if (!isEmail) {
                resolve({
                    status: 'error',
                    message: 'Email invalid'
                })

            }

            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: "error",
                    message: "Invalid user and password"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log('first', comparePassword)

            if (!comparePassword) {
                resolve({
                    status: 'error',
                    message: 'User or password incorrect'
                })
            }

            const access_token = await generateAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generateRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            console.log('accestoken', access_token)
            resolve({
                status: 'OK',
                message: 'Signin sucessfully',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, confirmPassword } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "error",
                    message: "User existed"
                })
            }

            const hashPassword = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                email,
                password: hashPassword
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'User has been created',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('check user', checkUser)
            if (checkUser === null) {
                resolve({
                    status: "error",
                    message: "User not existed"
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Update sucessfully',
                data: updateUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('check user', checkUser)
            if (checkUser === null) {
                resolve({
                    status: "error",
                    message: "User not existed"
                })
            }

            const deleteUser = await User.findByIdAndDelete(id, { new: true })
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                users: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getUserDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDetail = await User.findOne({
                _id: id
            })
            if (userDetail) (
                resolve({
                    status: 'OK',
                    userDetail: userDetail
                })
            )
            resolve({
                status: 'error',
                message: 'User not existed'
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    Signin,
    updateUser,
    deleteUser,
    getAllUser,
    getUserDetail,
    deleteManyUser

}