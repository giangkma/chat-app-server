import { Document } from 'mongoose';

export interface IMessage {
    ofUser: string;
    content: string;
    time: number;
}

export interface IConversation extends Document {
    firstId: string;
    secondId: string;
    lastMessage: string;
    lastSender: string;
    firstUserName: string;
    secondUserName: string;
    messages: IMessage[];
    lastUpdate: number;
}
