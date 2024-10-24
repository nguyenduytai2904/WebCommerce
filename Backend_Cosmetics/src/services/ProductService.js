const Product = require("../models/ProductModel")





const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: "error",
                    message: "Product name existed"
                })
            }

            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock: Number(countInStock),
                rating,
                description
            })
            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'Product has been created',
                    data: createProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            console.log('check product', checkProduct)
            if (checkProduct === null) {
                resolve({
                    status: "error",
                    message: "Product not existed"
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Update sucessfully',
                data: updateProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getProductDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct) (
                resolve({
                    status: 'OK',
                    data: checkProduct
                })
            )
            resolve({
                status: 'error',
                message: 'Product not existed'
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: "error",
                    message: "Product not existed"
                })
            }

            const deleteProduct = await Product.findByIdAndDelete(id, { new: true })
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    console.log('ids', ids)
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if (filter) {
                const label = filter[0]
                const allProduct = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    products: allProduct,
                    totalProduct: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                console.log('objectSort', objectSort)
                const allProduct = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    products: allProduct,
                    totalProduct: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find()
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit)
            }
            resolve({
                status: 'OK',
                products: allProduct,
                totalProduct: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllType = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {

            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,

            })
        } catch (e) {
            reject(e)
        }
    })
}




module.exports = {
    createProduct,
    updateProduct,
    getProductDetail,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType

}