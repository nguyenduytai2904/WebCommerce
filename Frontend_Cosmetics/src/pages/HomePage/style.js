import styled from "styled-components"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"



export const WrapperTypeProduct =styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    & : hover{
        color: rgb(50, 110, 81);
        background: rgb(207, 234, 221);
        span{
            color: rgb(50, 110, 81);
        }
    }
    width: 100%;
    text-align: center;
`

export const WrapperProducts= styled.div`
    display: flex;
    gap:14px;
    margin-top: 20px;
    flex-wrap: wrap;
`