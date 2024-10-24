import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as UserService from '../../services/UserService'
import {
    EyeFilled,
    EyeInvisibleFilled

} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'


const SignInPage = () => {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();


    const navigate = useNavigate()
    const handleNavigateSignup = () => {
        navigate('/signup')
    }

    const mutation = useMutationHooks(
        data => UserService.SigninUser(data)
    )
    const { data, isSuccess, isError } = mutation

    useEffect(() => {
        console.log('location', location)
        if (isSuccess) {
            if (location?.state) {
                navigate(location?.state)
            } else {

                navigate('/')
            }
            console.log('data', data)
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.userDetail, access_token: token }))
    }


    console.log('mutation', mutation)


    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }

    const handleSignin = () => {

        mutation.mutate({
            email, password
        })
        console.log('signin', email, password)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ width: '500px', height: '445px', borderRadius: '6px', backgroundColor: '#fff' }}>
                <WrapperContainerLeft>
                    <h1>Sign in</h1>
                    <p>Enjoy exclusive services and perks</p>
                    <h3 style={{ fontWeight: 'bold' }}>from MTP-Cosmetics</h3>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span onClick={() =>
                            setIsShowPassword(!isShowPassword)
                        }
                            style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}>

                            {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                        </span>
                        <InputForm placeholder="password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
                    </div>
                    {data?.status === "error" && <span style={{ color: 'red' }}>{data?.message}</span>}

                    <ButtonComponent
                        disabled={!email.length || !password.length}
                        onClick={handleSignin}
                        size={40}
                        styleButton={{
                            background: '#326e52',
                            fontSize: '15px',
                            padding: '10px 20px',
                            color: '#fff',
                            height: '43px',
                            width: 'auto',
                            fontWeight: '700',
                            borderRadius: '4px',
                            margin: '26px 0 10px'
                        }}
                        textButton="Sign in"
                        styleTextButton={{ color: '#fff' }}
                    />
                    <p><WrapperTextLight>Forget password?</WrapperTextLight></p>
                    <p>Don't have an account yet?<WrapperTextLight onClick={handleNavigateSignup}> Signup now</WrapperTextLight></p>
                </WrapperContainerLeft>

            </div>
        </div>

    )
}

export default SignInPage