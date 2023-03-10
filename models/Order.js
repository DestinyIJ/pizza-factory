import mongoose from 'mongoose'


const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Please provide a customer for this order.'],
    },
    address: {
        type: String,
        required: [true, 'Please provide an address for this order'],
        maxLength: [200, 'Order address cannot be more than 200 characters']
    },
    subTotal: {
        type: Number,
        default: 0
    },
    subTotal: {
        type: Number,
        required: [true, 'Please provide a sub-total amount.']
    },
    total: {
        type: Number,
        required: [true, 'Please provide a total amount.']
    },
    status: {
        type: Number,
        default: 0,
        min: 0,
        max: 4
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true
    }],
    paymentMethod: {
        type: Number,
        required: [true, 'Please provide a payment method.'],
        min: 0,
        max: 1,
    }
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)