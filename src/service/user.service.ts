import { IUser } from '../domain/auth.domain';
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

export default {
    getUserByUsername,
    checkDuplicatedUsername,
    getUserById,
};
