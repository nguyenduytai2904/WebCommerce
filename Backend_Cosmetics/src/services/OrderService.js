const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")





const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder

        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate({
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    const createOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user

                    })
                    if (createOrder) {
                        return {
                            status: 'OK',
                            message: 'Order has been created',
                        }
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'error',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'error',
                    message: `Sản phẩm với id ${newDate.join(',')} đã hết hàng`
                })
            }
            resolve({
                status: 'OK',
                message: `Success`
            })
        } catch (e) {
            reject(e)
        }
    })
}










module.exports = {
    createOrder,


}