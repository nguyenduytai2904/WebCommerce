import { Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { WrapperInfo } from "./style";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";




const OrderSuccess = () => {
    const order = useSelector((state) => state.order)

    const location = useLocation()
    console.log('location', location)
    const { state } = location

    return (
        <div style={{ background: '#f5f5f5', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Đơn hàng đã đặt thành công</h3>

                {/* Phần danh sách sản phẩm */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Danh sách sản phẩm bên trái */}

                    <div style={{ flex: '3', marginRight: '20px' }}>
                        {/* Header */}
                        <div >
                            {/* Chọn phương thức giao hàng */}
                            <Card title="Phương thức giao hàng" style={{ marginBottom: '20px' }}>
                                <div>
                                    <span style={{ color: 'orange', fontWeight: 'bold' }}>{orderContant.delivery[state?.shippingMethod]}</span> Giao hàng tiết kiệm
                                </div>
                                {/* <Radio.Group onChange={onShippingChange} value={shippingMethod}>
                                    <Space direction="vertical">
                                        <Radio value="FAST">
                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm
                                        </Radio>
                                        <Radio value="GO_JEK">
                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm
                                        </Radio>
                                    </Space>
                                </Radio.Group> */}
                            </Card>

                            {/* Chọn phương thức thanh toán */}
                            <Card title="Chọn phương thức thanh toán">
                                <div>
                                    {orderContant.payment[state?.paymentMethod]}
                                </div>
                                {/* <Radio.Group onChange={onPaymentChange} value={paymentMethod}>
                                    <Space direction="vertical">
                                        <Radio value="CASH_ON_DELIVERY">
                                            Thanh toán tiền mặt khi nhận hàng
                                        </Radio>
                                    </Space>
                                </Radio.Group> */}
                            </Card>
                        </div>




                        <WrapperInfo style={{ marginTop: '20px' }}>
                            {state?.orders.map((order) => {
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center' }}>
                                            <img src={order?.image} alt="Product" style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px' }} />
                                            <span>{order?.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', width: '500px', justifyContent: 'space-between', textAlign: 'center', alignItems: 'center' }}>
                                            <span >
                                                <span>Giá tiền: {convertPrice(order?.price)}</span>
                                            </span>

                                            <span style={{ width: '100px', color: 'red' }}>
                                                <span>Số lượng: {convertPrice(order?.amount)}</span>
                                            </span>
                                            {/* Nút xóa */}
                                        </div>
                                    </div>
                                )
                            })}

                        </WrapperInfo>
                    </div>


                </div>
                <span style={{ width: '100px', color: 'red' }}>
                    <span>Tổng tiền: {convertPrice(state?.totalPrice)}</span>
                </span>
            </div>

        </div>
    )

}



export default OrderSuccess