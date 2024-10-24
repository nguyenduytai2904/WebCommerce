import { Button, Card, Checkbox, Col, Form, Image, InputNumber, Radio, Row, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from '../../services/UserService'
import InputComponent from "../../components/InputComponent/InputComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import * as OrderService from '../../services/OrderService'
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide";
import { WrapperInfo } from "./style";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct, removeOrderProduct } from "../../redux/slides/orderSlide";



const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)


    const [shippingMethod, setShippingMethod] = useState('FAST');
    const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''

    })
    const [form] = Form.useForm()


    const dispatch = useDispatch()






    useEffect(() => {
        form.setFieldsValue(stateUserDetail)
    }, [form, stateUserDetail])

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetail({
                ...stateUserDetail,
                city: user?.city,
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                email: user?.email
            })
        }
    }, [isOpenModalUpdateInfo])

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }


    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    const discountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.discount * cur.amount))
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo > 150000) {

            return 15000
        }
        else if (priceMemo === 0) {
            return 0
        } else {

            return 30000
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(discountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, discountMemo, diliveryPriceMemo])





    const handleAddOrder = () => {
        if (user?.access_token && order?.orderItemsSelected && user?.name
            && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderItems: order?.orderItemsSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: paymentMethod,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                    user: user?.id
                }
            ), {
                onSuccess: () => {
                    message.success('Đặt hàng thành công')
                }
            }
        }
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,
                { ...rests },
                token
            )
            return res
        }
    )
    const mutationAddOrder = useMutationHooks(
        (data) => {
            const {
                token,
                ...rests } = data
            const res = OrderService.createOrder(
                { ...rests },
                token
            )
            return res
        }
    )

    const { isLoading, data } = mutationUpdate
    const { data: dataAdd, isSuccess, isLoading: isLoadingAddOrder, isError } = mutationAddOrder

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrayOrdered = []
            order?.orderItemsSelected?.forEach(element => {
                arrayOrdered.push(element.product)
            })
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
            message.success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    shippingMethod,
                    paymentMethod,
                    orders: order?.orderItemsSelected,
                    totalPrice: totalPriceMemo
                }
            })
        }
        else if (isError)
            message.error()

    }, [isSuccess, isError])



    const handleCancelUpdate = () => {
        setStateUserDetail({
            name: '',
            email: '',
            phone: '',
            isAdmin: false
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    console.log('data', data)
    const handUpdateInfoUser = () => {
        console.log('stateUser', stateUserDetail)
        const { name, phone, address, city } = stateUserDetail
        if (name && phone && address && city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetail }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, city, phone }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnChangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value
        })
    }





    const onShippingChange = e => {
        setShippingMethod(e.target.value);
    };

    const onPaymentChange = e => {
        setPaymentMethod(e.target.value);
    };
    console.log('userDetail', stateUserDetail)
    return (
        <div style={{ background: '#f5f5f5', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Chọn phương thức thanh toán</h3>

                {/* Phần danh sách sản phẩm */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Danh sách sản phẩm bên trái */}
                    <div style={{ flex: '3', marginRight: '20px' }}>
                        {/* Header */}
                        <div >
                            {/* Chọn phương thức giao hàng */}
                            <Card title="Chọn phương thức giao hàng" style={{ marginBottom: '20px' }}>
                                <Radio.Group onChange={onShippingChange} value={shippingMethod}>
                                    <Space direction="vertical">
                                        <Radio value="FAST">
                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm
                                        </Radio>
                                        <Radio value="GO_JEK">
                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Card>

                            {/* Chọn phương thức thanh toán */}
                            <Card title="Chọn phương thức thanh toán">
                                <Radio.Group onChange={onPaymentChange} value={paymentMethod}>
                                    <Space direction="vertical">
                                        <Radio value="CASH_ON_DELIVERY">
                                            Thanh toán tiền mặt khi nhận hàng
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Card>
                        </div>
                    </div>

                    {/* Thông tin tổng tiền bên phải */}
                    <div style={{ flex: '1', background: '#fff', padding: '20px', borderRadius: '8px' }}>
                        <WrapperInfo>
                            <div>
                                <span>Địa chỉ: </span>
                                <span>{user?.address} - {user?.city} </span>
                                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleChangeAddress}>       Thay đổi </span>
                            </div>
                        </WrapperInfo>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Tạm tính</span>
                            <span style={{ fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Giảm giá</span>
                            <span style={{ fontWeight: 'bold' }}>{`${discountMemo} %`}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Phí giao hàng</span>
                            <span style={{ fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '18px', color: 'red' }}>
                            <span>Tổng tiền</span>
                            <span>{convertPrice(totalPriceMemo)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span></span>
                            <span >(Đã bào gồm VAT)</span>
                        </div>
                        <button onClick={() => handleAddOrder()} style={{
                            cursor: 'pointer', width: '100%', padding: '10px', background: 'red', color: '#fff', border: 'none', borderRadius: '5px'
                        }}>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>             <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handUpdateInfoUser} >
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <InputComponent value={stateUserDetail.email} onChange={handleOnChangeDetail} name="email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <InputComponent value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <InputComponent value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address" />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <InputComponent value={stateUserDetail.city} onChange={handleOnChangeDetail} name="city" />
                    </Form.Item>

                </Form>

            </ModalComponent>
        </div>





    )

}



export default PaymentPage