import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  return (
    <div style={{ background: '#efefef', height: '1000vh', width: '100%' }}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
        <h1><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang chủ</span> - Chi tiết sản phẩm</h1>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailPage