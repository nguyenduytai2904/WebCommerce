import { Button } from 'antd'
import React from 'react'
import {
  SearchOutlined,
} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';




const ButtonInputSearch = (props) => {
  const {
    size, placeholder, textButton,
    backgroundColorInput = '#fff',
    backgroundColorButton = '#CFEADD',
    colorButton = '#326e51'
  } = props
  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        variant='borderless'
        style={{ backgroundColor: backgroundColorInput, borderRadius: 0 }}
        {...props}
      />
      <ButtonComponent
        size={size}
        icon={<SearchOutlined color={colorButton} style={{ color: colorButton }} />}
        styleButton={{
          backgroundColor: backgroundColorButton,
          border: 'none',
          borderRadius: 0
        }}
        textButton={textButton}
        styleTextButton={{ color: colorButton }}
      />


    </div>
  )
}

export default ButtonInputSearch