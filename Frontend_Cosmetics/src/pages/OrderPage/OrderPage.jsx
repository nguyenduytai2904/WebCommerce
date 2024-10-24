import { Button, Checkbox, Col, Form, Image, InputNumber, Row } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from '../../services/UserService'
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide";
import { WrapperInfo } from "./style";
import { useNavigate } from "react-router-dom";



const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''

    })

    const navigate = useNavigate()
    const [form] = Form.useForm()


    const dispatch = useDispatch()


    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }))
        } else {
            dispatch(decreaseAmount({ idProduct }))

        }
    }

    const handleDeleteItem = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }

    const handleOnChangeCheckAll = (e) => {
        console.log('e.target', e.target.checked)
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])

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

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    }

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    const handleAddCard = () => {
        console.log('user', user)
        if (!order.orderItemsSelected?.length) {
            message.error('Vui lòng chọn sản phẩm')
        }
        else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment')
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

    const { isLoading, data } = mutationUpdate



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


    console.log('userDetail', stateUserDetail)
    return (
        <div style={{ background: '#f5f5f5', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Giỏ hàng</h3>

                {/* Phần danh sách sản phẩm */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Danh sách sản phẩm bên trái */}
                    <div style={{ flex: '3', marginRight: '20px' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#fff', borderRadius: '8px' }}>
                            <span style={{ width: '390px', textAlign: 'left' }}>
                                <Checkbox onChange={handleOnChangeCheckAll} checked={listChecked?.length === order?.orderItems?.length} />
                                <span> Có tất cả {order?.orderItems?.length} sản phẩm </span>
                            </span>
                            <div style={{ display: 'flex', width: '500px', justifyContent: 'space-between', textAlign: 'center' }}>
                                <span style={{ width: '100px' }}>Đơn giá</span>
                                <span style={{ width: '100px' }}>Số lượng</span>
                                <span style={{ width: '100px' }}>Thành tiền</span>
                                <DeleteOutlined style={{ width: '30px', cursor: 'pointer' }} onClick={handleRemoveAllOrder} />

                            </div>
                        </div>

                        {/* Danh sách các sản phẩm */}
                        <div style={{ background: '#fff', marginTop: '10px', borderRadius: '8px', padding: '10px' }}>
                            {/* sản phẩm */}
                            {order?.orderItems.map((order) => {
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center' }}>
                                            <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)} />
                                            <img src={order?.image} alt="Product" style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px' }} />
                                            <span>{order?.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', width: '500px', justifyContent: 'space-between', textAlign: 'center', alignItems: 'center' }}>
                                            <span style={{ width: '100px' }}>{convertPrice(order?.price)}</span>
                                            <div style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <button onClick={() => handleChangeCount('decrease', order?.product)}>
                                                    <MinusOutlined style={{ cursor: 'pointer' }} />
                                                </button>
                                                <input value={order?.amount} readOnly style={{ width: '40px', textAlign: 'center' }} />
                                                <button onClick={() => handleChangeCount('increase', order?.product)}>
                                                    <PlusOutlined style={{ cursor: 'pointer' }} />
                                                </button>
                                            </div>
                                            <span style={{ width: '100px', color: 'red' }}>{convertPrice((order?.price * order?.amount))}</span>
                                            {/* Nút xóa */}
                                            <DeleteOutlined style={{ width: '30px', cursor: 'pointer' }} onClick={() => handleDeleteItem(order?.product)} />
                                        </div>
                                    </div>)
                            })}


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
                        <button onClick={() => handleAddCard()} style={{
                            cursor: 'pointer', width: '100%', padding: '10px', background: 'red', color: '#fff', border: 'none', borderRadius: '5px'
                        }}>
                            Mua hàng
                        </button>
                    </div>
                </div>
            </div>
            <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handUpdateInfoUser} >
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



export default OrderPage