import { NextFunction, Response } from 'express';
import { statusHTTP } from '../config';
import { verifyToken } from '../helpers/jwt';

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET ||
    'access-token-secret-example-giangdtkma.com-!@#$';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const isAuth = async (
    req: any,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    try {
        // Lấy token được gửi lên từ phía client
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            throw new Error();
        }
        const bearer = bearerHeader.split(' ');
        const accessToken = bearer[1] ?? bearer[0];
        // Thực hiện giải mã token xem có hợp lệ hay không?
        const decoded = await verifyToken(accessToken, accessTokenSecret);

        // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
        req.userInfo = decoded;
        next();
    } catch (error) {
        return res.status(statusHTTP.UNAUTHORIZED).json({
            error: 'Xác thực không thành công .',
        });
    }
};
