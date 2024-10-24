import { Col, Image, InputNumber, Row } from 'antd'
import React, { useState } from 'react'
import test from '../../assets/images/test.webp'
import imagesmall from '../../assets/images/imagesmall.webp'
import { WrapperBtnQualityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextReview } from './style'
import {
    StarFilled,
    PlusOutlined,
    MinusOutlined
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'





const ProductDetailComponent = ({ idProduct }) => {

    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()



    const onChange = (value) => {
        setNumProduct(Number(value))
    }

    console.log('idproduct', idProduct)
    const fetchGetDetailProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log('id', id)
        const res = await ProductService.getDetailProduct(id)
        return res.data
    }

    console.log('location', location)

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            setNumProduct(numProduct - 1)
        }
    }

    const { isLoading, data: productDetails } = useQuery({ queryKey: ['product-detail', idProduct], queryFn: fetchGetDetailProduct, enabled: !!idProduct })
    const handleAddOrderProduct = () => {
        console.log('productDetail', productDetails)
        if (!user?.id) {
            navigate('/signin', { state: location?.pathname })
        }
        else {
            // {
            //     name:{type:String, required: true},
            //     amount:{type:Number, required: true},
            //     image:{type:String, required: true},
            //     price:{type:Number, required:true},
            //     product:{
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref:'Product',
            //         required:true
            //     }
            // }
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id
                }
            }))
        }
    }



    console.log('productDetail', productDetails, user)
    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ border: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} width='100%' preview={false} alt="image product" />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4} style={{ width: '64px', height: ' 64px' }}><WrapperStyleImageSmall style={{ width: '64px', height: ' 64px' }} src={productDetails?.image} preview={false} alt="image product" /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} style={{ width: '64px', height: ' 64px' }}><WrapperStyleImageSmall style={{ width: '64px', height: ' 64px' }} src={productDetails?.image} preview={false} alt="image product" /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} style={{ width: '64px', height: ' 64px' }}><WrapperStyleImageSmall style={{ width: '64px', height: ' 64px' }} src={productDetails?.image} preview={false} alt="image product" /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} style={{ width: '64px', height: ' 64px' }}><WrapperStyleImageSmall style={{ width: '64px', height: ' 64px' }} src={productDetails?.image} preview={false} alt="image product" /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} style={{ width: '64px', height: ' 64px' }}><WrapperStyleImageSmall style={{ width: '64px', height: ' 64px' }} src={productDetails?.image} preview={false} alt="image product" /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} style={{ width: '64px', height: ' 64px' }}><WrapperStyleImageSmall style={{ width: '64px', height: ' 64px' }} src={productDetails?.image} preview={false} alt="image product" /></WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <StarFilled style={{ fontSize: '12px', color: '#ff6602' }} />
                        <StarFilled style={{ fontSize: '12px', color: '#ff6602' }} />
                        <StarFilled style={{ fontSize: '12px', color: '#ff6602' }} />
                        <StarFilled style={{ fontSize: '12px', color: '#ff6602' }} />
                        <StarFilled style={{ fontSize: '12px', color: '#ff6602' }} />
                        <WrapperStyleTextReview> 0 đánh giá | 0 Hỏi đáp | Mã sản phẩm: {productDetails?._id}</WrapperStyleTextReview>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)} ₫</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Quality</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} onClick={() => handleChangeCount('decrease')} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} onClick={() => handleChangeCount('increase')} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <WrapperStyleNameProduct style={{
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: 'rgb(120,120,120)'
                    }}>Thành phần chi tiết: {productDetails?.ingredient}</WrapperStyleNameProduct>
                    <WrapperStyleNameProduct style={{
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: 'rgb(120,120,120)'
                    }}>Lưu ý: {productDetails?.description}</WrapperStyleNameProduct>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                backgroundColor: '#ff6600',
                                fontSize: '15px',
                                padding: '10px 20px',
                                color: '#fff',
                                height: '43px',
                                width: '150px',
                                fontWeight: '700',
                                borderRadius: '4px'
                            }}
                            onClick={handleAddOrderProduct}
                            textButton="Add to cart"
                            styleTextButton={{ fontWeight: '800', color: '#326e52' }}
                        ></ButtonComponent>
                        {/* <ButtonComponent
                            size={40}
                            styleButton={{
                                backgroundColor: '#326e52',
                                fontSize: '15px',
                                padding: '10px 20px',
                                color: '#fff',
                                height: '43px',
                                width: '150px',
                                fontWeight: '700',
                                borderRadius: '4px'
                            }}

                            textButton="Add to cart"
                            styleTextButton={{ fontWeight: '800', color: '#326e52' }}
                        ></ButtonComponent> */}
                    </div>
                </Col>
            </Row>

        </Loading>
    )
}

export default ProductDetailComponent