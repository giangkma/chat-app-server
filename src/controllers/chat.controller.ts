import {
    responseSuccess,
    responseAuthError,
    responseBadRequest,
    responseServerError,
} from './../helpers/response';
import { Request, Response } from 'express';

import User from '../models/user.model';
import Conversation from '../models/conversation.model';

const findPeople = async (req: Request, res: Response): Promise<Response> => {
    try {
        const s = (req.query.s as string) ?? '';
        const result = await User.find({ username: new RegExp(s, 'i') })
            .select('-password')
            .lean()
            .catch(() => {
                return responseBadRequest(
                    res,
                    'Server error when searching user',
                );
            });
        return responseSuccess(res, result);
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const getConversation = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        let id1 = req.query.id1 as string;
        let id2 = req.query.id2 as string;
        if (!id1 || !id2) return responseAuthError(res, 'No user found');
        if (id1 > id2) id2 = [id1, (id1 = id2)][0];
        const cvs = await Conversation.findOne({
            firstId: id1,
            secondId: id2,
        }).lean();
        if (cvs) {
            return responseSuccess(res, { conversation: cvs });
        }
        const firstUser = await User.findById(id1).lean();
        const secondUser = await User.findById(id2).lean();
        const newCvs = new Conversation({
            firstId: id1,
            secondId: id2,
            firstUserName: firstUser.username,
            secondUserName: secondUser.username,
        });
        newCvs.save((err, conversation) => {
            if (err) {
                return responseServerError(
                    res,
                    'Server error when creating new conversation',
                );
            }
            return responseSuccess(res, {
                conversation: conversation.toObject(),
            });
        });
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const getConversationList = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const id = req.query.id as string;
        if (!id) return responseAuthError(res, 'No user found');
        const listConversation = await Conversation.find({
            $or: [{ firstId: id }, { secondId: id }],
            $and: [{ lastMessage: { $ne: '' } }],
        })
            .select('-messages')
            .sort({ lastUpdate: -1 })
            .lean();
        if (listConversation)
            return responseSuccess(res, { list: listConversation });
        return responseSuccess(res, { list: [] });
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const getMessages = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { cid, page, last } = req.query;
        if (!cid)
            return res.status(400).json({ message: 'Missing conversation id' });
        const conversation = await Conversation.findById(cid)
            .select('messages')
            .lean();

        if (!conversation)
            return responseServerError(res, 'Cannot find conversation');
        return responseSuccess(res, { messageList: conversation.messages });
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const sendMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { cid, content, uid, username } = req.body;
        if (!cid || !content || !uid)
            return res.status(400).json({ message: 'Missing some data' });
        const conversation = await Conversation.findById(cid);
        if (!conversation)
            return responseBadRequest(res, 'Cannot find conversation');
        const currentTime = Date.now();

        conversation.messages.push({
            ofUser: uid,
            content: content,
            time: currentTime,
        });
        conversation.lastMessage = content;
        conversation.lastSender = username;
        conversation.lastUpdate = currentTime;
        conversation.save((err, cv) => {
            if (err) {
                return responseServerError(
                    res,
                    'Server error when add new message',
                );
            }
            const newMessage = cv.messages[conversation.messages.length - 1];
            conversation.messages = undefined;
            return responseSuccess(res, {
                message: 'Add new message successfully',
                newMessage: newMessage,
                conversation: conversation.toObject(),
            });
        });
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

export default {
    findPeople,
    getConversation,
    getConversationList,
    getMessages,
    sendMessage,
};
