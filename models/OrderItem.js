import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
})

export default mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema)