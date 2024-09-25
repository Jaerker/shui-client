import { observer } from "mobx-react-lite";
import { useStore } from "../../Stores/store";
import Message from "../Message/Message";
import { useEffect } from "react";


const MessageBoard = () => {  
    const {messageStore} = useStore();
    const {getMessages, messages,isLoading} = messageStore;
    useEffect(() => {
        getMessages();
      }, []); 

    return (
    <>
            {messages.length <= 0 ? (
            <>
                <h1 className='w-full absolute px-10 bottom-1/2 font-medium text-2xl text-center' >{isLoading ? 'Laddar...' : 'Du har inga meddelanden att visa!'}</h1>            
            </>) : 
            (<>
                <section className={`w-dvw px-5 pt-3 grid`}>
                    {messages.map(message => (  
                        <Message key={message.id} message={message} />))}
                </section>
            </>) }

    </>);
}

export default observer(MessageBoard);