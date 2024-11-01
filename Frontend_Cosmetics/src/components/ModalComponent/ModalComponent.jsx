import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({title ='Modal',isOpen,children,...rests}) => {
  return (
    <Modal title={title} isOpen={isOpen} {...rests}>
        {children}
    </Modal>
  )
}

export default ModalComponent