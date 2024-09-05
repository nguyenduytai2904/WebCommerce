import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";




export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);   
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    word-break: break-word;
`

export const WrapperStyleTextReview= styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120);
`

export const WrapperPriceProduct=styled.div`
    color: rgb(250,250,250);
    border-redius: 4px;
`
export const WrapperPriceTextProduct=styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    color: #000;
    font-weight: bold;
    padding: 10px;
    margin-top: 10px;
`
export const WrapperQualityProduct=styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`


export const WrapperInputNumber= styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm{
        width: 60px;
        border-top: none;
        border-bottom: none;
        &.ant-input-number-input-wrap{
            display: none !important;
        }   
    }
`