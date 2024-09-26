import { observer } from 'mobx-react-lite';
import { useStore } from '../../Stores/store';
import Message from '../Message/Message';
import { useEffect } from 'react';


const MessageBoard = () => {  
    const {messageStore} = useStore();
    const {getMessages, messages, isLoading} = messageStore;
    useEffect(() => {
        getMessages();
      }, []); 

    return (
    <>
            {messages.length <= 0 ? (
            <>
                <h1 className='w-full max-w-xl absolute px-10 bottom-1/2 font-medium text-2xl text-center' >{isLoading ? 'Laddar...' : 'Du har inga meddelanden att visa!'}</h1>            
            </>) : 
            (<>
                <ul className={`transition-all duration-300 w-dvw max-w-xl px-5 pt-3 grid ${isLoading ? 'blur-sm' : ''}`}>
                    {messages.map(message => (  
                        <Message key={message.id} message={message} />))}
                </ul>
            </>) }

    </>);
}

export default observer(MessageBoard);