import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import test from '../../assets/images/test.webp'
import imagesmall from '../../assets/images/imagesmall.webp'
import { WrapperBtnQualityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextReview } from './style'
import {
    StarFilled,
    PlusOutlined,
    MinusOutlined
  } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailComponent = () => {
    const onChange=()=>{}
  return (
        <Row style={{padding: '16px', background: '#fff', borderRadius: '4px'}}>
            <Col span={10} style={{border: '1px solid #e5e5e5',paddingRight:'8px'}}>
                <Image src={test} width='100%' preview={false} alt="image product"/>
                <Row style={{paddingTop: '10px', justifyContent:'space-between'}}>
                    <WrapperStyleColImage span={4} style={{width: '64px',height:' 64px'}}><WrapperStyleImageSmall style={{width: '64px',height:' 64px'}} src={imagesmall} preview={false} alt="image product"/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4} style={{width: '64px',height:' 64px'}}><WrapperStyleImageSmall style={{width: '64px',height:' 64px'}} src={imagesmall} preview={false} alt="image product"/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4} style={{width: '64px',height:' 64px'}}><WrapperStyleImageSmall style={{width: '64px',height:' 64px'}} src={imagesmall} preview={false} alt="image product"/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4} style={{width: '64px',height:' 64px'}}><WrapperStyleImageSmall style={{width: '64px',height:' 64px'}} src={imagesmall} preview={false} alt="image product"/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4} style={{width: '64px',height:' 64px'}}><WrapperStyleImageSmall style={{width: '64px',height:' 64px'}} src={imagesmall} preview={false} alt="image product"/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4} style={{width: '64px',height:' 64px'}}><WrapperStyleImageSmall style={{width: '64px',height:' 64px'}} src={imagesmall} preview={false} alt="image product"/></WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>Kem Dưỡng La Roche-Posay Giúp Phục Hồi Da Đa Công Dụng 40ml</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{fontSize: '12px', color: '#ff6602'}}/>
                    <StarFilled style={{fontSize: '12px', color: '#ff6602'}}/>
                    <StarFilled style={{fontSize: '12px', color: '#ff6602'}}/>
                    <WrapperStyleTextReview> | 14 review</WrapperStyleTextReview>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>30.00 USD</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <div style={{margin: '10px 0 20px',padding: '10px 0',borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{marginBottom: '10px' }}>Quality</div>
                    <WrapperQualityProduct>
                        <button style={{border: 'none', background:'transparent'}}>
                            <MinusOutlined style={{color: '#000', fontSize:'20px'}}/>
                        </button>
                        <WrapperInputNumber  defaultValue={3} onChange={onChange} size="small" />
                        <button style={{border: 'none', background:'transparent'}}>
                            <PlusOutlined  style={{color: '#000', fontSize:'20px'}} />
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{display: 'flex', alignItems:'center', gap: '12px'}}>
                    <ButtonComponent 
                        size={40}  
                        styleButton={{ backgroundColor: '#326e52',
                            fontSize: '15px',
                            padding: '10px 20px',
                            color: '#fff',
                            height: '43px',
                            width: '130px',
                            fontWeight: '700',
                            borderRadius: '4px'
                        }}
                        textButton="Add to cart" 
                        styleTextButton={{color: '#fff'}}
                    ></ButtonComponent>

                    <ButtonComponent 
                        size={40}  
                        styleButton={{ backgroundColor: '#ff6600',
                            fontSize: '15px',
                            padding: '10px 20px',
                            color: '#fff',
                            height: '43px',
                            width: '130px',
                            fontWeight: '700',
                            borderRadius: '4px'
                        }}
                        textButton="Buy now" 
                        styleTextButton={{color: '#fff'}}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
  )
}

export default ProductDetailComponent