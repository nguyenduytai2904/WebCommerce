import { Card } from 'antd'

import React from 'react'
import { StypeBrandProduct, StypeNameProduct, WrapperCardStype, WrapperDiccountText, WrapperPriceText, WrapperReportText, WrapperStyleTextReview } from './style'
import {
    StarFilled
  } from '@ant-design/icons';
const CardComponent = () => {
  return (
    <WrapperCardStype
        hoverable
        bordered='false'
        style={{ width: 200,borderRadius:'0' }}
        styles={{body: {padding: '5px'},header:{width: '200px',height: '200px'}}}
        cover={<img  alt="example"style={{borderRadius: '0'}} bordered={false} src="https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-nuoc-tay-trang-bioderma-danh-cho-da-dau-hon-hop-500ml-1690274181_img_220x220_0dff4c_fit_center.jpg" />}
    >
        <div style={{padding: '5px 10px',paddingBottom: '10px'}}>
            <WrapperPriceText >
                <span style={{marginRight: '8px'}}>10.00 USD </span>
                    <WrapperDiccountText>
                    -5%
                </WrapperDiccountText>
            </WrapperPriceText>
            <StypeBrandProduct>L'oreal</StypeBrandProduct>
            <StypeNameProduct>Nước tẩy trang L'oreal dành cho da nhạy cảm</StypeNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                    <span>4.5</span><StarFilled style={{fontSize: '12px', color: 'yellow'}}/>
                </span>
                <WrapperStyleTextReview>(200)</WrapperStyleTextReview>
            </WrapperReportText>
        </div>
        
  </WrapperCardStype>
  )
}

export default CardComponent