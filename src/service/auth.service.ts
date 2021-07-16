import { IRegister, IUser } from '../domain/auth.domain';
import User from '../models/user.model';
import userService from './user.service';

const register = async (payload: IRegister): Promise<IUser> => {
    const { username, password, name } = payload;
    const isDuplicated = await userService.checkDuplicatedUsername(username);
    if (isDuplicated) {
        throw `Tên người dùng '${username}' đã có người sử dụng !`;
    }
    const result = User.create({
        name,
        username,
        password,
        isOnline: false,
    });
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

export default {
    register,
};
