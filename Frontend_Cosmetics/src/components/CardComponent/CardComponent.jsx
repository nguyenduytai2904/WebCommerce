import { Card } from 'antd'

import React from 'react'
import { StypeBrandProduct, StypeNameProduct, WrapperCardStype, WrapperDiccountText, WrapperPriceText, WrapperReportText, WrapperStyleTextReview } from './style'
import {
    StarFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailProduct = (id) => {
        navigate(`/product-detail/${id}`)
    }
    return (
        <WrapperCardStype
            hoverable
            bordered='false'
            style={{ width: '200', borderRadius: '0' }}
            styles={{ body: { padding: '5px' }, header: { width: '200px', height: '200px' } }}
            cover={<img alt="example" style={{ borderRadius: '0' }} bordered={false} src={image} />}
            onClick={() => handleDetailProduct(id)}
        >
            <div style={{ padding: '5px 10px', paddingBottom: '10px' }}>
                <WrapperPriceText >
                    <span style={{ marginRight: '8px' }}>{convertPrice(price)} ₫ </span>
                    <WrapperDiccountText>
                        - {discount || 5}%
                    </WrapperDiccountText>
                </WrapperPriceText>
                <StypeBrandProduct>{name}</StypeBrandProduct>
                {/* <StypeNameProduct>{description}</StypeNameProduct> */}
                <WrapperReportText>
                    <span style={{ marginRight: '4px' }}>
                        <span>{rating}</span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                    </span>
                    <WrapperStyleTextReview>({selled || 200})</WrapperStyleTextReview>
                </WrapperReportText>
            </div>

        </WrapperCardStype>
    )
}

export default CardComponent