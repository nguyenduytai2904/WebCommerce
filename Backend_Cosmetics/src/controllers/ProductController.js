const ProductService = require('../services/ProductService')




const createProduct = async (req, res) => {
    try {

        const { name, image, type, price, countInStock, rating, description } = req.body

        console.log('body', req.body)
        if (!name || !image || !type || !price || !countInStock) {
            return res.status(400).json({
                status: 'error',
                message: 'The input is required'
            })
        }


        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Productid required'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}

const getProductDetail = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 'error',
                message: 'ProductId is required'
            })
        }
        const response = await ProductService.getProductDetail(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
const deleteProduct = async (req, res) => {
    try {
        const proId = req.params.id
        if (!proId) {
            return res.status(400).json({
                status: 'error',
                message: 'ProId required'
            })
        }
        const response = await ProductService.deleteProduct(proId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteMany = async (req, res) => {
    console.log('req.body', req.body)
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(400).json({
                status: 'error',
                message: 'ids required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}



module.exports = {
    createProduct,
    updateProduct,
    getProductDetail,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType

}