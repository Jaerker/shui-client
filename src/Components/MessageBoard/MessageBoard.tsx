import { useEffect, useState } from "react";


const MessageBoard = () => {

    const [messages, setMessages] = useState();

    useEffect(() => {

    }, [messages]);

    return (<>
        <section >
                <h1 className='font-medium text-2xl text-center px-10' >Du har inga meddelanden att visa!</h1>
                
                <div>
                </div>
        </section>
        
        </>);
}

export default MessageBoard;