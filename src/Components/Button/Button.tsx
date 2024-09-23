import Pen from '../../Assets/pen.svg';
import Cancel from '../../Assets/cancel.svg';
import { useStore } from '../../Stores/store';
import { observer } from 'mobx-react-lite';



const Button = () => {

    const {messageStore} = useStore();
    const {editMode, toggleEditMode} = messageStore;


    return (
        <button className='fixed bottom-0 right-0 m-5 p-2 rounded-md bg-app-btn z-10' onClick={toggleEditMode}>
            <section className='relative w-50px h-50px'>
            <img className={`absolute transition-all duration-300 ${editMode ? 'opacity-0' : 'opacity-1'}`} src={Pen} alt='Icon of a pen'/>
            <img className={`absolute transition-all duration-300 ${!editMode ? 'opacity-0' : 'opacity-1'} `} src={Cancel} alt='Icon for canceling edit'/>
            </section>
            
            
        </button>
    );
}

export default observer(Button);