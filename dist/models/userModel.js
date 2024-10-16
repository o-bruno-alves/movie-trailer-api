import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, default: 'avatar-default.jpg' },
    role: { type: String, default: 'USER' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
