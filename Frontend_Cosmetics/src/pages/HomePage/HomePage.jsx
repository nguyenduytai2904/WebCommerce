import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SilderComponent from "../../components/SliderComponent/SilderComponent";

import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
    const searchProduct = useSelector((state) => state.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [limit, setLimit] = useState(6)
    const [loading, setLoading] = useState(false)
    const [typeProducts, setTypeProducts] = useState([])
    const fetchProductAll = async (context) => {
        console.log('context', context)
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)

        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    const { isLoading, data, isPlaceholderData } = useQuery({ queryKey: ['products', limit, searchDebounce], queryFn: fetchProductAll, retry: 3, retryDelay: 1000, placeholderData: true })

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])


    return (
        <Loading isLoading={isLoading || loading}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', background: '#efefef' }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SilderComponent arrImages={[slider2, slider3, slider4]} />
                    <WrapperProducts>
                        {data?.products?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image} name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                />)
                        })}


                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textButton='More' type="outline" styleButton={{
                            border: '3px solid #326e51',
                            width: '240px',
                            height: '38px',
                            margin: 0,
                            padding: 0,
                            borderRadius: '4px',
                            color: '#326e51'
                        }}
                            disabled={data?.totalProduct === data?.products?.length || data?.totalPage === 1}
                            styleTextButton={{ paddingTop: '5px', fontWeight: 'bold', width: '100%', height: '100%', color: data?.totalProduct === data?.products?.length && '#fff' }}
                            onClick={() => setLimit((prev) => prev + 6)}
                        />
                    </div>

                </div>
            </div>

        </Loading>
    )
}

export default HomePage