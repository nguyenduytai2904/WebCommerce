import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Popover } from 'antd'
import { WrapperAccountHeader, WrapperContentPopup, WrapperHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/lib/transfer/search'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Space } from 'antd';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';
import { seachProduct } from '../../redux/slides/productSlide';




const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    console.log('user', user)
    const handleNavigateSignin = () => {
        navigate('/signin')
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const order = useSelector((state) => state.order)

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setUsername(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(seachProduct(e.target.value))
    }
    const handleHome = () => {
        navigate('/')
    }
    return (
        <div style={{ width: '100%', background: '#326e51', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader style={{ cursor: 'pointer' }} onClick={handleHome}>
                        MTP-Consmetic
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder="tìm kiếm sản phẩm"
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <Loading isLoading={loading}>
                        <WrapperAccountHeader>
                            {userAvatar ? (
                                <img src={userAvatar} alt='avatar'
                                    style={{
                                        height: '30px',
                                        weight: '30px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (

                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click"  >
                                        <div style={{ cursor: 'pointer' }}>{username?.length ? username : user.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateSignin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng ký - Đăng nhập</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>

                            )}

                        </WrapperAccountHeader>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent