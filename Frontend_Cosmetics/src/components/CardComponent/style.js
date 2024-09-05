import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStype= styled(Card)`
    width: 200px;
    & img(
        height: 200px;
        width: 200px;
    )
    
`

export const StypeBrandProduct= styled.div`
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    color: #326e51
`

export const WrapperReportText= styled.div`
    font-size: 11px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
`

export const WrapperPriceText= styled.div`
    font-size: 16px;
    color: #ff6600;
    font-weight: bold;
`

export const WrapperDiccountText = styled.span`
    font-size: 13px;
    color: #ff6600;
    font-weight: bold;
`

export const StypeNameProduct = styled.div`
    font-weight: 400;
    font-size: 13px;
    color: #326e51;
`

export const WrapperStyleTextReview= styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120);
`