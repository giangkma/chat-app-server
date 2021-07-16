import jwt from 'jsonwebtoken';
import { IUser } from '../domain/auth.domain';
/**
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
export const generateToken = (
    user: IUser,
    secretSignature: string,
    tokenLife: string,
): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        const userData = {
            _id: user._id,
            name: user.name,
            username: user.username,
        };
        jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            },
        );
    });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
export const verifyToken = (
    token: string,
    secretKey: string,
): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded: any) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded.data);
        });
    });
};
