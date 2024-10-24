import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'



const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const dispatch = useDispatch()
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const { data, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            handleGetDetailUser(user?.id, user?.access_token)
            message.success()
        } else if (isError) {

        }
    }, [isSuccess, isError])

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.userDetail, access_token: token }))
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }
    const handleOnChangePhone = (value) => {
        setPhone(value)
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLable htmlFor="name">Name</WrapperLable>
                    <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnChangeName} />
                    <ButtonComponent

                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            fontSize: '15px',
                            padding: '2px 6px 6px',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                        }}
                        textButton="Cập nhật"
                        styleTextButton={{ color: '#326e52', fontSize: '15px', fontWeight: '700' }}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="email">Email</WrapperLable>
                    <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnChangeEmail} />
                    <ButtonComponent

                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            fontSize: '15px',
                            padding: '2px 6px 6px',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                        }}
                        textButton="Cập nhật"
                        styleTextButton={{ color: '#326e52', fontSize: '15px', fontWeight: '700' }}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="phone">Phone</WrapperLable>
                    <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnChangePhone} />
                    <ButtonComponent

                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            fontSize: '15px',
                            padding: '2px 6px 6px',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                        }}
                        textButton="Cập nhật"
                        styleTextButton={{ color: '#326e52', fontSize: '15px', fontWeight: '700' }}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="address">Address</WrapperLable>
                    <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnChangeAddress} />
                    <ButtonComponent

                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            fontSize: '15px',
                            padding: '2px 6px 6px',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                        }}
                        textButton="Cập nhật"
                        styleTextButton={{ color: '#326e52', fontSize: '15px', fontWeight: '700' }}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="avatar">Avatar</WrapperLable>
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img src={avatar} style={{
                            height: '60px',
                            weight: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} alt='avatar' />
                    )
                    }
                    {/* <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnChangeAvatar} /> */}
                    <ButtonComponent

                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            fontSize: '15px',
                            padding: '2px 6px 6px',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                        }}
                        textButton="Cập nhật"
                        styleTextButton={{ color: '#326e52', fontSize: '15px', fontWeight: '700' }}>

                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}

export default ProfilePage