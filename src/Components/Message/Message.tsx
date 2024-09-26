import { useEffect, useState } from "react";
import MessageModel from '../../Models/MessageModel';
import MessageBottomPart from '../../Assets/message-bottom-part.svg';
import { useStore } from "../../Stores/store";
import { observer } from "mobx-react-lite";

type Props = {
    key: string,
    message: MessageModel;
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

const Message = ({message}: Props) => {
    
    const [createdDate, setCreatedDate]  = useState('');
    const [updatedDate, setUpdatedDate]  = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {messageStore} = useStore();
    const {chosenMessage, handleMessageClickedInMessageBoard, toggleEditMode, deleteMessage} = messageStore;

    const convertDateAndTime = (ISODateString: string) => {
        const separatedDate  = new Date(ISODateString).toLocaleString().split(/[: -]/);
        return `${Day[new Date(ISODateString).getDay()]} ${separatedDate[2]} ${Month[parseInt(separatedDate[1])-1]}, ${separatedDate[3]}:${separatedDate[4]}${new Date().getFullYear() === new Date(ISODateString).getFullYear() ? '' : ', ' + separatedDate[0] }`;
    }

    
    const convertedMessage = message.text.split('\n').filter(x => x !== '');
    const minimizedCharacterLimit = 150;
    const minimizedLineLimit = 2;
    let charCounter = 0;

    useEffect(()=> {
        setCreatedDate(convertDateAndTime(message.createdAt));
        setUpdatedDate(convertDateAndTime(message.updatedAt));
    }, []);

    useEffect(() => {
        setIsFocused(chosenMessage.id === message.id);
        if(chosenMessage.id !== message.id)
            setMenuOpen(false);
    },[chosenMessage]);



    return (
        <li className={`relative my-7 transition duration-300 ${chosenMessage.id === message.id ? 'scale-105' : ' '}`}>
                {isFocused && (<>
                    <button className={`absolute top-5 w-12 h-5 right-2 flex justify-center items-center`} onClick={()=>setMenuOpen(!menuOpen)}>
                        <section className='mr-1 bg-gray-400 w-1.5 h-1.5 rounded-xl'></section>
                        <section className='mr-1 bg-gray-400 w-1.5 h-1.5 rounded-xl'></section>
                        <section className='mr-1 bg-gray-400 w-1.5 h-1.5 rounded-xl'></section>
                    </button>
                    <ul className ={`grid items-center transition-all duration-300 absolute top-6 right-0 text-black m-5 bg-white overflow-hidden  ${menuOpen ? 'h-82px border':'h-0'}`}>
                        <li className='p-2 border-b'><button onClick={() => {toggleEditMode(message)} }>Ändra</button></li>
                        <li className='p-2 border-b'><button onClick={deleteMessage}>Ta bort</button></li>
                    </ul>
                </>
                )}
                
            <section className={`transition-all duration-500 bg-white text-black flex flex-col p-3  ${isFocused ? 'max-h-dvh' : 'max-h-60'}`} onClick={() => handleMessageClickedInMessageBoard(message)}>
                <p className='select-none text-gray-500 pt-1 text-sm'>{createdDate}</p>
                {isFocused ? (
                    <>
                        {convertedMessage.map((x, i)  =>
                                <p key={x} className={`${i === 0 ? 'pt-5 pb-2' : 'py-2'} font-medium`}>{x}</p>
                        )}
                    </>
                    ) : (
                    <>
                        {convertedMessage.map((x, i)  => {

                            if(i < minimizedLineLimit){
                                if(i === minimizedLineLimit)
                                    return <p key={x} className='pt-3 font-semibold text-gray-500'>{`...`}</p>
                                charCounter += x.length;
                        
                                if(charCounter > minimizedCharacterLimit){
                                    return <p key={x} className={`pt-5 font-medium`}>{`${x.slice(0, charCounter-minimizedCharacterLimit-3)}`}<span className='pt-3 font-semibold text-gray-500'>...</span></p>    
                                }
                                return <p key={x} className={`${i === 0 ? 'pt-5 pb-2' : 'py-2'} font-medium`}>{x}</p>
                            }
                        })}
                    </>
                )}
                <section className='flex justify-between items-end'>
                    <h2 className='select-none font-bold italic pt-5 before:inline-block before:content-[""] before:border before:border-black before:w-4 before:mr-1 before:-translate-y-1'>{message.username}</h2>
                    {updatedDate !== createdDate && (<>
                    {isFocused ? (<>
                        <p className='select-none text-sm italic text-gray-500 font-semibold'>Uppdaterades {updatedDate}</p>
                    </>) : (<>
                        <p className='border rounded-xl w-6 h-6 text-center text-white bg-gray-500 font-bold'>!</p>
                    </>)}

                    </>)}
                </section>
            </section>
            <img className='select-none absolute right-0' src={MessageBottomPart} alt='bottom part of message' />
        </li>);
}

export default observer(Message);