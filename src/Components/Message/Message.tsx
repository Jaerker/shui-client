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
    const [isFocused, setIsFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {messageStore} = useStore();
    const {chosenMessage, handleMessageClickedInMessageBoard, toggleEditMode, deleteMessage} = messageStore;

    const convertDateAndTime = (ISODateString: string) => {
        const separatedDate  = new Date(ISODateString).toLocaleString().split(/[: -]/);
        setCreatedDate(`${Day[new Date(ISODateString).getDay()]} ${separatedDate[2]} ${Month[parseInt(separatedDate[1])-1]}, ${separatedDate[3]}:${separatedDate[4]}${new Date().getFullYear() === new Date(ISODateString).getFullYear() ? '' : ', ' + separatedDate[0] }`);
    }

    
    const convertedMessage = message.text.split('\n').filter(x => x !== '');
    const minimizedCharacterLimit = 150;
    const minimizedLineLimit = 1;
    let charCounter = 0;
    useEffect(()=> {
        convertDateAndTime(message.createdAt);
    }, []);
    useEffect(() => {
        setIsFocused(chosenMessage.id === message.id);
        if(chosenMessage.id !== message.id)
            setMenuOpen(false);
    },[chosenMessage]);


    const confirmDeletion = async () => {
        if(window.confirm('Tryck på OK om du är säker på att du vill ta bort anteckningen.')){
            await deleteMessage();
            console.log('kommer jag hit?')
        }
        else{
            setMenuOpen(false);
        }
    }
    return (
        <article className={`relative my-7 transition duration-300 ${chosenMessage.id === message.id ? 'scale-105' : ' '}`}>
                {isFocused && (<><button className={`absolute top-5 w-12 h-5 right-2 flex justify-center items-center`} onClick={()=>setMenuOpen(!menuOpen)}>
                    <section className='mr-1 bg-gray-400 w-1.5 h-1.5 rounded-xl'></section>
                    <section className='mr-1 bg-gray-400 w-1.5 h-1.5 rounded-xl'></section>
                    <section className='mr-1 bg-gray-400 w-1.5 h-1.5 rounded-xl'></section>
                </button>
                <ul className ={`grid items-center transition-all duration-300 absolute top-6 right-0 text-black m-5 bg-white overflow-hidden  ${menuOpen ? 'h-82px border':'h-0'}`}>
                    <li className='p-2 border-b'><button onClick={() => {toggleEditMode(message)} }>Ändra</button></li>
                    <li className='p-2 border-b'><button onClick={confirmDeletion}>Ta bort</button></li>
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
                            charCounter += x.length;
                            if(i > minimizedLineLimit)
                                return <p key={x} className='pt-3 font-semibold text-gray-500'>{`...`}</p>
                            else{
                                if(charCounter > minimizedCharacterLimit){
                                    return <p key={x} className={`pt-5 font-medium`}>{`${x.slice(0, charCounter-minimizedCharacterLimit-3)}`}<span className='pt-3 font-semibold text-gray-500'>...</span></p>    
                                }
                            }
        
                            return <p key={x} className={`${i === 0 ? 'pt-5 pb-2' : 'py-2'} font-medium`}>{x}</p>
                        })}
                    </>
                    
                )}
                
                <h2 className='select-none font-bold italic pt-5 before:inline-block before:content-[""] before:border before:border-black before:w-4 before:mr-1 before:-translate-y-1'>{message.username}</h2>
            </section>
            <img className='select-none absolute right-0' src={MessageBottomPart} alt='bottom part of message' />
        </article>);
}

export default observer(Message);