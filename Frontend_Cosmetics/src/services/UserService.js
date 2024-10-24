import axios from "axios"

export const axiosJWT = axios.create()

export const SigninUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, data)
    return res.data
}


export const SignupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, data)
    return res.data
}


export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getUserDetail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/deleteUser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}




export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refreshToken`, {
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

export const updateUser = async (id, data, access_token) => {

    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/updateUser/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}


export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}








