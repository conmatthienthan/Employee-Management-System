import mogoose from 'mongoose';

const userSchema = new mogoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["admin", "employee"], required: true},
    profileImage: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const User = mogoose.model('User', userSchema);
export default User;