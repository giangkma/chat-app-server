import { Document } from 'mongoose';

export interface ILogin {
    username: string;
    password: string;
}
export interface IRegister extends ILogin {
    name: string;
}
export interface IUser extends Document {
    name: string;
    username: string;
    password?: string;
    isOnline: boolean;
    dateAdded?: number;
}

export interface UpdateProfile {
    name: string;
    avatar?: string;
}

export interface ChangePassword {
    password: string;
    newPassword: string;
}
