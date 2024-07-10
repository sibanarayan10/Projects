import mongoose, { Schema } from "mongoose";
import { Transaction } from "./transaction.model";


// const {Schema}=mongoose;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8,

    },
    PhoneNumber: {
        type: Number,
        required: true,

    },
    country: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    },
    transactionHistory:[
        {type:Schema.Types.ObejctId,
        ref:Transaction
    }
    ],

})

UserSchema.pre('save', function (next) {
    if (!this.isModified(this.password)) {
        return next();
    }

    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
    }).catch(next);
})
UserSchema.methods.generateAccessToken = function () {
   return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}
UserSchema.methods.generateAccessToken = function () {
    return  jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })
}
UserSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
export const User = mongoose.model('User', UserSchema);