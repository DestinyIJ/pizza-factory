import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)