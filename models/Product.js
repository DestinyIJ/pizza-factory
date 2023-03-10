import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this product.'],
        maxLength: [60, 'Product title cannot be more than 60 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product.'],
        maxLength: [200, 'Product description cannot be more than 200 characters']
    },
    prices: {
        type: {
            small: {
                type: Number,
                default: 0
            },
            medium: {
                type: Number,
                default: 0
            },
            large: {
                type: Number,
                default: 0
            }
        },
        required: [true, 'Please provide a price for this product.']
    },
    discount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: [true, 'Please provide an image for this product']
    },
    extraOptions: {
        type: [
            {
                name: {
                    type: String,
                    required: [true, 'Please provide a text for this extra-option'],
                },
                price: {
                    type: Number,
                    required: [true, 'Please provide a price for this product extra-option']
                }
            }
        ]
    }
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)