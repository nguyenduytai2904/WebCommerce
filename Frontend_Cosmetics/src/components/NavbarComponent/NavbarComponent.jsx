import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'
import * as ProductService from '../../services/ProductService'
import TypeProduct from '../TypeProduct/TypeProduct'



const NavbarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <TypeProduct name={option} key={option}>{option}</TypeProduct>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.lable}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ dispaly: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{`from ${option - 0.5} star`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }




    const [typeProducts, setTypeProducts] = useState([])
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()

        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <WrapperLableText>Skincare Category</WrapperLableText>
            <WrapperContent>
                {renderContent('text', typeProducts)}

            </WrapperContent>


        </div>
    )
}

export default NavbarComponent