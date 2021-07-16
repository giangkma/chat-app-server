import { Server, Socket } from 'socket.io';
import User from '../models/user.model';

export const statusHTTP = {
    SUCCESS: 200,
    FAIL: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
};

export enum roles {
    STUDENT = 'student',
    TEACHER = 'teacher',
}

export const configSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('User has connect');
        socket.on('disconnect', () => {
            console.log('User disconnected');
            socket.emit('user-disconnect');
            socket.disconnect();
        });

        socket.on('user-login', (uid: any) => {
            console.log('user-login : ', uid);
            User.findById(uid).exec((err, user) => {
                if (user) {
                    user.isOnline = true;
                    user.save();
                }
            });
        });

        socket.on('user-setOffline', (uid: any) => {
            console.log('user-offline : ', uid);
            User.findById(uid).exec((err, user) => {
                if (user) {
                    user.isOnline = false;
                    user.save();
                }
            });
        });

        socket.on('user-join-room', ({ roomId }: any) => {
            console.log(`A user joined chat-${roomId}`);
            socket.join(`chat-${roomId}`);
        });

        socket.on('user-send-message', ({ conversation, newMessage }: any) => {
            socket.to(`chat-${conversation._id}`).emit('receive-message', {
                conversation: conversation,
                newMessage: newMessage,
            });
        });

        socket.on(
            'user-typing-message',
            ({ cid, uid, isTyping, name }: any) => {
                socket
                    .to(`chat-${cid}`)
                    .emit('user-typing', { cid, uid, isTyping, name });
            },
        );

        socket.on('new-conversation', ({ conversation, createId }: any) => {
            console.log('a client create a new conversation');
            const otherId =
                conversation.firstId === createId
                    ? conversation.secondId
                    : conversation.firstId;
            socket.broadcast.emit('add-new-conversation', {
                conversation: conversation,
                receiveId: otherId,
            });
        });
    });
};
