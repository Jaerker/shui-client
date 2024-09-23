type MessageModel = {
    id: string,
    text: string;
    username: string,
    createdAt: string,
    updatedAt: string,
    dataBeforeUpdate?: {
        username: string,
        text: string
    }
}

export default MessageModel; 