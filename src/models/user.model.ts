/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcryptjs';
import mongoose, { Model } from 'mongoose';
import { IUser } from '../domain/auth.domain';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            private: true,
        },
        dateAdded: {
            type: Date,
            default: Date.now,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: '',
        },
    },
    { versionKey: false },
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compare(password, user.password);
};

UserSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User: Model<IUser> = mongoose.model('User', UserSchema);

export default User;
