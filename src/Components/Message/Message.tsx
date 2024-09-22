import { useState } from "react";
import MessageModel from '../../Models/MessageModel';
type Props = {
    message: MessageModel;
    writable?: boolean;
}

const Message = (props: Props) => {
    const {message, writable} = props;
    const [editMode, setEditMode] = useState(writable);
    
    return (

        <div>
            <h1>{message.text}</h1>
            <p>{message.username}</p>
        </div>
    );
}

export default Message;