import React,{useEffect, useState} from 'react'
import { WrapperContainerLeft, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import {
    EyeFilled,
    EyeInvisibleFilled

  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as UserService from '../../services/UserService'
import * as message from '../../components/Message/Message'


const SignUpPage = () => {
    const navigate= useNavigate()

    const handleNavigateSignin = () =>{
        navigate('/signin')
    }

    const mutation = useMutationHooks(
        data => UserService.SignupUser(data)
      )
    const {data,isSuccess,isError} =mutation

    useEffect(()=>{
        if(isSuccess){
            message.success()
            handleNavigateSignin()
        } else  if(isError)
        {
            message.error();
        }

    },[isSuccess,isError]) 
    console.log('mutation',mutation)


    const  [isShowPassword,setIsShowPassword]= useState(false);
    const  [isShowConfirmPassword,setIsShowConfirmPassword]= useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const handleOnChangeEmail= (value) =>{
        setEmail(value)
    }
    const handleOnChangePassword= (value) =>{
        setPassword(value)
    }
    const handleOnChangeConfirmPassword= (value) =>{
        setConfirmPassword(value)
    }
    const handleSignup= () =>{
        mutation.mutate({
            email,password,confirmPassword
        })
        console.log('signup',email,password,confirmPassword)
    }

  return (
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center' , height:'100vh'}}>
        <div style={{width: '500px', height:'445px',borderRadius:'6px',backgroundColor:'#fff'}}>
        <WrapperContainerLeft>
            <h1>Sign up</h1>
            <p>Enjoy exclusive services and perks</p>
            <h3 style={{fontWeight:'bold'}}>from MTP-Cosmetics</h3>
            <InputForm style={{marginBottom: '10px'}}  placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail}/>
            <div style={{position: 'relative'}}>
                <span 
                    onClick={() =>
                        setIsShowPassword(!isShowPassword)
                    }
                style={{zIndex:10, position:'absolute',top: '4px', right: '8px' }}>
                    {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                </span>
                <InputForm placeholder="password" style={{marginBottom: '10px'}} type={isShowPassword? "text" : "password"} 
                value={password} onChange={handleOnChangePassword}/>
            </div>
            <div 
            style={{position: 'relative'}}>
                <span 
                    onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                    }
                style={{zIndex:10, position:'absolute',top: '4px', right: '8px' }}>
                    {isShowConfirmPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                </span>
                <InputForm placeholder="confirm password" type={isShowConfirmPassword? "text" : "password"}
                value={confirmPassword} onChange={handleOnChangeConfirmPassword}
                />
            </div>
            {data?.status ==='error' && <span style={{color: 'red'}}>{data?.message}</span>}    
            <ButtonComponent 
            disabled={!email.length || !password.length || !confirmPassword.length }
            onClick={handleSignup}
                        size={40}  
                        styleButton={{ background: '#326e52',
                            fontSize: '15px',
                            padding: '10px 20px',
                            color: '#fff',
                            height: '43px',
                            width: 'auto',
                            fontWeight: '700',
                            borderRadius: '4px',
                            margin: '26px 0 10px'
                        }}
                        textButton="Sign up" 
                        styleTextButton={{color: '#fff'}}
                    ></ButtonComponent>
            <p>Already have an account?<WrapperTextLight onClick={handleNavigateSignin}> Signin now</WrapperTextLight></p>          
        </WrapperContainerLeft>
    </div>
    </div>
  )
}

export default SignUpPage