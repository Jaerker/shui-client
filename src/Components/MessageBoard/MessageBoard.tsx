import { observer } from "mobx-react-lite";
import { useStore } from "../../Stores/store";
import Message from "../Message/Message";
import { useEffect } from "react";


const MessageBoard = () => {  
    const {messageStore} = useStore();
    const {messages,isLoading} = messageStore;
    useEffect(() => {
        messageStore.getMessages();
      },[]); 

    return (
    <>
            {messages.length <= 0 ? (
            <>
            <section className='w-dvw px-5 grid min-h-dvh'>
                <h1 className='font-medium text-2xl text-center' >{isLoading ? 'Laddar...' : 'Du har inga meddelanden att visa!'}</h1>            
            </section>
            </>) : 
            (<>
            <section className='w-dvw px-5 grid'>
                {messages.map(message => (  
                    <Message key={message.id} message={message} writable={false} />))}
            </section>
            </>) }
    </>);
}

export default observer(MessageBoard);