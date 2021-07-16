import { Response } from 'express';
import { statusHTTP } from '../config';

export const responseBadRequest = (
    res: Response,
    message?: string,
): Response => {
    return res
        .status(statusHTTP.BAD_REQUEST)
        .send({ error: message ?? 'Bad Request!' });
};

export const responseServerError = (
    res: Response,
    message?: string,
): Response => {
    return res
        .status(statusHTTP.FAIL)
        .send({ error: message ?? 'Internal Server Error!' });
};

export const responseAuthError = (
    res: Response,
    message?: string,
): Response => {
    return res
        .status(statusHTTP.UNAUTHORIZED)
        .send({ error: message ?? 'Authorization !' });
};

export const responseSuccess = (res: Response, data: any): Response => {
    return res.status(statusHTTP.SUCCESS).send(data);
};
