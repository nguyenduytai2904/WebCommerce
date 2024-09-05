import React from 'react'
import {Badge, Col} from 'antd'
import { WrapperAccountHeader, WrapperHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/lib/transfer/search'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
  import { Space } from 'antd';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';


const HeaderComponent = () => {
  return (
    <div style={{width: '100%', background:'#326e51', display: 'flex', justifyContent:'center'}}>
        <WrapperHeader >
            <Col span={5}>
                <WrapperTextHeader>
                    MTP-Consmetic
                </WrapperTextHeader>
            </Col>
            <Col span={13}>
            <ButtonInputSearch 
                size="large"
                textButton="Searching"
                placeholder="Searching brand"
            //onSearch={onSearch} 
            />
            </Col>
            <Col span={6} style={{display: 'flex', gap: '54px', alignItems: 'center'}}>
                <WrapperAccountHeader>
                    <UserOutlined style={{fontSize:'30px'}}/>
                    <div>
                        <WrapperTextHeaderSmall>Sign in - Sign up</WrapperTextHeaderSmall>
                        <div>
                            <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                            <CaretDownOutlined />
                        </div>
                    </div>
                </WrapperAccountHeader>
                <div>
                    <Badge count={4} size="small">
                    <ShoppingCartOutlined style={{fontSize:'30px', color: '#fff'}}/>
                    </Badge>
                    <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                </div>
            </Col>
        </WrapperHeader>
    </div>
  )
}

export default HeaderComponent