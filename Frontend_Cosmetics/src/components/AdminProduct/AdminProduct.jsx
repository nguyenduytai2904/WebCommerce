import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Input, Modal, Select, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusCircleFilled, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'



const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const user = useSelector((state) => state?.user)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')

    const searchInput = useRef(null);

    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: ''
    })
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        discount: '',
        image: '',
        type: '',
        countInStock: '',
        ingredient: ''

    })

    const [form] = Form.useForm()

    const mutation = useMutationHooks(
        (data) => {
            const { name,
                price,
                description,
                rating,
                image,
                type,
                countInStock } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock
            })
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = ProductService.updateProduct(
                id,
                token,
                { ...rests }
            )
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const {
                id,
                token
            } = data
            const res = ProductService.deleteProduct(
                id,
                token
            )
            return res
        }
    )

    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const {

                token, ...ids
            } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token
            )
            return res
        }
    )
    console.log('mutationDeleteMany', mutationDeleteMany)

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        console.log('res', res)
        return res
    }



    const fetchGetDetailProduct = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected)
        if (res?.data) {
            setStateProductDetail({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                ingredient: res?.data?.ingredient,
                discount: res?.data?.discount
            })
        }
    }

    useEffect(() => {
        form.setFieldsValue(stateProductDetail)
    }, [form, stateProductDetail])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailProduct(rowSelected)
        }
    }, [isOpenDrawer, rowSelected])

    const handleDetailProduct = () => {
        setIsOpenDrawer(true)
    }

    const handleDeleteManyProduct = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })

    }

    const { data, isSuccess, isError } = mutation
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany



    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res
    }
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts, })
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct, })


    const { isLoading, data: products } = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => { setIsModalOpenDelete(true) }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailProduct} />
            </div>
        )
    }

    console.log('typeProduct', typeProduct)
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         // <Highlighter
        //         //     highlightStyle={{
        //         //         backgroundColor: '#ffc069',
        //         //         padding: 0,
        //         //     }}
        //         //     searchWords={[searchText]}
        //         //     autoEscape
        //         //     textToHighlight={text ? text.toString() : ''}
        //         // />
        //     ) : (
        //         text
        //     ),
    });


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>=200.000',
                    value: '>=',
                },
                {
                    text: '<=200.000',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 200000
                } else {
                    return record.price <= 200000
                }
            },
        },
        {
            title: 'CountInStock',
            dataIndex: 'countInStock',
            sorter: (a, b) => a.countInStock - b.countInStock,
            filters: [
                {
                    text: '>=100',
                    value: '>=',
                },
                {
                    text: '<=100',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.countInStock >= 100
                } else {
                    return record.countInStock <= 100
                }
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.products?.length && products?.products?.map((product) => {
        return { ...product, key: product._id }
    })
    console.log('datatale', dataTable)

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isErrorDeletedMany])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted])


    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }



    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        // setStateProductDetail({
        //     name: '',
        //     price: '',
        //     description: '',
        //     rating: '',
        //     image: '',
        //     type: '',
        //     countInStock: ''
        // })
        form.resetFields()
    }


    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
    }
    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })

    }
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    const handleOnChangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview
        })
    }

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetail }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }
    return (
        <divv isLoading={isLoading}>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Loading isLoading={isLoading}>
                    <Button onClick={() => setIsModalOpen(true)} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                        <PlusCircleFilled style={{ fontSize: '60px' }} /></Button>
                </Loading>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyProduct} isLoading={isLoading} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }} />
            </div>
            <ModalComponent isLoading={isLoading} forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <Select
                            name="type"
                            //defaultValue="lucy"
                            //style={{ width: 120 }}
                            value={stateProduct.type}
                            onChange={handleChangeSelect}
                            options={renderOptions(typeProduct?.data?.data)}
                        />
                    </Form.Item>
                    {stateProduct.type === 'add_type' && (
                        <Form.Item
                            label="New type"
                            name="newType"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your countInStock!' }]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>
                    {/* <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your rating!' }]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                    </Form.Item> */}
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button >Select File</Button>
                            {stateProduct.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '60px',
                                    weight: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt='avatar' />
                            )
                            }
                        </WrapperUploadFile>
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={handleCloseDrawer} width='90%'>

                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onUpdateProduct}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateProductDetail.name} onChange={handleOnChangeDetail} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <InputComponent value={stateProductDetail.type} onChange={handleOnChangeDetail} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your countInStock!' }]}
                    >
                        <InputComponent value={stateProductDetail.countInStock} onChange={handleOnChangeDetail} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputComponent value={stateProductDetail.price} onChange={handleOnChangeDetail} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your rating!' }]}
                    >
                        <InputComponent value={stateProductDetail.rating} onChange={handleOnChangeDetail} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input your discount!' }]}
                    >
                        <InputComponent value={stateProductDetail.discount} onChange={handleOnChangeDetail} name="discount" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <InputComponent value={stateProductDetail.description} onChange={handleOnChangeDetail} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="ingredient"
                        name="ingredient"
                        rules={[{ required: true, message: 'Please input your ingredient!' }]}
                    >
                        <InputComponent value={stateProductDetail.ingredient} onChange={handleOnChangeDetail} name="ingredient" />
                    </Form.Item>


                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatarDetail} maxCount={1}>
                            <Button >Select File</Button>
                            {stateProductDetail.image && (
                                <img src={stateProductDetail?.image} style={{
                                    height: '60px',
                                    weight: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt='avatar' />
                            )
                            }
                        </WrapperUploadFile>
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            update
                        </Button>
                    </Form.Item>
                </Form>

            </DrawerComponent>
            <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
                <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
            </ModalComponent>
        </divv>
    )
}

export default AdminProduct