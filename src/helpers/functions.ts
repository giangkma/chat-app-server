import { IUser } from '../domain/auth.domain';

export const fillterDataUser = (user: IUser): IUser => {
    const result: any = {
        _id: user._id,
        name: user.name,
        username: user.username,
    };
    return result;
};
