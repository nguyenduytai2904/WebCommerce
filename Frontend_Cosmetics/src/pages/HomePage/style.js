import styled from "styled-components"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"



export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: rgb(50, 110, 81);
        background: rgb(207, 234, 221);
        span{
            color: rgb(50, 110, 81);
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'};
    color: ${(props) => props.disabled ? '#fff' : 'red'};
    
`
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
`
// export const WrapperProducts = styled.div`
//     display: grid;
//     grid-template-columns: repeat(6, 1fr); /* 6 cột, mỗi cột rộng bằng nhau */
//     gap: 14px; /* Khoảng cách giữa các sản phẩm */
//     margin-top: 20px;
//     justify-content: center;
// `