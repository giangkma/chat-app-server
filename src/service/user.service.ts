import bcrypt from 'bcryptjs';
import Conversation from '../models/conversation.model';
import { roles } from '../config';
import { IUser, UpdateProfile } from '../domain/auth.domain';
import User from '../models/user.model';

const getUserByUsername = async (username: string): Promise<IUser> => {
    const result = await User.findOne({ username });

    if (!result) {
        throw 'Người dùng không tồn tại !';
    }
    return result;
};

const checkDuplicatedUsername = async (username: string): Promise<boolean> => {
    const result = await User.findOne({ username });
    return !!result;
};

const getUserById = async (id: string): Promise<IUser> => {
    const result = await User.findOne({ _id: id });
    if (!result) {
        throw 'Người dùng không tồn tại !';
    }
    return result;
};

const updateScore = async (userId: string, score: string[]): Promise<IUser> => {
    const result = await User.findByIdAndUpdate(
        userId,
        { score },
        {
            new: true,
        },
    );
    if (!result) {
        throw 'Đã xảy ra lỗi !';
    }
    return result;
};

const getAllStudents = async (): Promise<IUser[]> => {
    const result = User.find({ role: roles.STUDENT });
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const updateProfile = async (
    userId: string,
    data: UpdateProfile,
): Promise<IUser> => {
    const dataForm = {
        name: data.name,
    } as UpdateProfile;
    if (data.avatar) {
        dataForm.avatar = data.avatar;
    }
    const result = await User.findByIdAndUpdate(userId, dataForm, {
        new: true,
    });
    if (!result) {
        throw 'Đã xảy ra lỗi !';
    }
    return result;
};

const changePassword = async (
    userId: string,
    newPassword: string,
): Promise<IUser> => {
    const newPasswordHash = await bcrypt.hash(newPassword, 8);
    const result = await User.findByIdAndUpdate(
        userId,
        { password: newPasswordHash },
        {
            new: true,
        },
    );
    if (!result) {
        throw 'Đã xảy ra lỗi !';
    }
    return result;
};

export default {
    getUserByUsername,
    checkDuplicatedUsername,
    getUserById,
    updateScore,
    getAllStudents,
    updateProfile,
    changePassword,
};
