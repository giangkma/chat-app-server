import * as express from 'express';
import { IUser } from './auth.domain';

export interface MessageDetails {
    message: string;
}

export interface RequestUser extends express.Request {
    userInfo: IUser;
}
