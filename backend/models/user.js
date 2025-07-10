import mongoose, { Schema } from "mongoose";



const useSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,

    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    lastLogin: {
        type: Date,
    },
    is2FAEnabled: {
        type: Boolean,
        default: false,
    },

    twoFAOtp: {
        type: String,
        select: false,
    },
    twoFAOExpires: {
        type: Date,
        select: false,
    }
}, { timestamps: true });

const User = mongoose.model("User", useSchema);

export default User;

