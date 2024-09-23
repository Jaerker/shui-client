import { useEffect, useState } from "react";
import MessageModel from '../../Models/MessageModel';
import MessageBottomPart from '../../Assets/message-bottom-part.svg';

type Props = {
    key: string,
    message: MessageModel;
    writable?: boolean;
}

const Day = [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag'
]

const Month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Juni',
    'Juli',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec'
]

const Message = (props: Props) => {
    const {message, writable} = props;
    const [editMode, setEditMode] = useState(writable);
    const [createdDate, setCreatedDate]  = useState('');


    const convertDateAndTime = (ISODateString: string) => {
        const separatedDate  = new Date(ISODateString).toLocaleString().split(/[: -]/);
        setCreatedDate(`${Day[new Date(ISODateString).getDay()]} ${separatedDate[2]} ${Month[parseInt(separatedDate[1])-1]}, ${separatedDate[3]}:${separatedDate[4]}${new Date().getFullYear() === new Date(ISODateString).getFullYear() ? '' : ', ' + separatedDate[0] }`);
    }
    
    useEffect(()=> {
        convertDateAndTime(message.createdAt);
    }, []);

    return (
        <article className='relative my-7'>
            <section className='bg-white h-auto text-black flex flex-col p-3'>
                <p className='select-none text-gray-500 pt-1 text-sm'>{createdDate}</p>
                <p className='py-5 font-medium'>{message.text}</p>
                <h2 className='select-none font-bold italic pt-5 before:inline-block before:content-[""] before:border before:border-black before:w-4 before:mr-1 before:-translate-y-1'>{message.username}</h2>
            </section>
            <img className='select-none absolute right-0' src={MessageBottomPart} alt='bottom part of message' />
        </article>);
}

export default Message;