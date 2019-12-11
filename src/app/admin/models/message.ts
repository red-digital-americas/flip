export class MessageData {
    id: number;
    message1: string;
    userId: number;
    time: Date;
    status: boolean;
    conversationId: number;
    conversation: Conversation;
}

export class Conversation{
    id: number;
    userId: number;
    userIdReciver: number;
    date: number;
    status: boolean;
}