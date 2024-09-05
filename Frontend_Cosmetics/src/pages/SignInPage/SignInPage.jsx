import React, {useState} from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

import {
    EyeFilled,
    EyeInvisibleFilled

  } from '@ant-design/icons';

const SignInPage = () => {
    const  [isShowPassword,setIsShowPassword]= useState(false);
    return (
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center' , height:'100vh'}}>
        <div style={{width: '500px', height:'445px',borderRadius:'6px',backgroundColor:'#fff'}}>
        <WrapperContainerLeft>
            <h1>Sign in</h1>
            <p>Enjoy exclusive services and perks</p>
            <h3 style={{fontWeight:'bold'}}>from MTP-Cosmetics</h3>
            <InputForm style={{marginBottom: '10px'}} placeholder="abc@gmail.com"/>
            <div style={{position: 'relative'}}>
                <span style={{zIndex:10, position:'absolute',top: '4px', right: '8px' }}>
                    {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                </span>
                <InputForm placeholder="password" type={isShowPassword? "text" : "password"}/>
            </div>
            <ButtonComponent 
                        size={40}  
                        styleButton={{ backgroundColor: '#326e52',
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
                        styleTextButton={{color: '#fff'}}
                    ></ButtonComponent>
            <p><WrapperTextLight>Forget password?</WrapperTextLight></p>
            <p>Don't have an account yet?<WrapperTextLight> Signup now</WrapperTextLight></p>            
        </WrapperContainerLeft>
        
    </div>
    </div>
    
  )
}

export default SignInPage