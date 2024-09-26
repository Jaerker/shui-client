import { useStore } from "../../Stores/store";
import MessageBottomPart from '../../Assets/message-bottom-part.svg';
import { observer } from "mobx-react-lite";
import Button from "../Button/Button";

const Form = () => {

    const {messageStore} = useStore();
    const {chosenMessage, editMode, isLoading, handleFormChange, handleSubmit} = messageStore;

    return (<>
        <article className={`bg-app-bg border border-white-wave fixed transition duration-300 top-0 w-full max-w-xl h-dvh  ${editMode ? `opacity-1 ${isLoading ? 'blur-sm' : ''}` : 'opacity-0 pointer-events-none'}`}>
            <form className={`w-full h-full pt-20 px-5 rounded grid grid-rows-form gap-4`} onSubmit={handleSubmit}>

                <section className='relative bg-white text-black flex flex-col'>
                    <textarea required onChange={handleFormChange} name='text' value={chosenMessage.text} className={`p-3 font-medium h-full ${isLoading ? 'pointer-events-none text-gray-500' : ''}`} placeholder='Här ska texten stå!' />
                    <img className='select-none absolute right-0 -bottom-8 -z-10' src={MessageBottomPart} alt='bottom part of message' />
                </section>
                <input required onChange={handleFormChange} name='username' type='text' value={chosenMessage.username} className={`italic mt-10 p-3 rounded-sm w-full bg-app-bg border border-white ${isLoading ? 'pointer-events-none text-gray-500' : ''}`} placeholder='Användarnamn'/>
                <Button type='publish' content={chosenMessage.id ? 'Ändra': 'Publicera' } />

            </form>
            
        </article>
    </>
    );
}
export default observer(Form);