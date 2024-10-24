const OrderService = require('../services/OrderService')




const createOrder = async (req, res) => {
    try {

        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(400).json({
                status: 'error',
                message: 'The input is required'
            })
        }


        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const userid = req.params.id
        if (!userid) {
            return res.status(404).json({
                status: 'error',
                message: 'UserId is required'
            })
        }
        const response = await OrderService.getOrderDetails(userid)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}



module.exports = {
    createOrder,
    getDetailsOrder,

}