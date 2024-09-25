import Pen from '../../Assets/pen.svg';
import Cancel from '../../Assets/cancel.svg';
import { useStore } from '../../Stores/store';
import { observer } from 'mobx-react-lite';

type Props = {
    type: 'edit' | 'cancel' | 'publish',
    content?: string
}

const Button = ({type, content}: Props) => {

    const {messageStore} = useStore();
    const {editMode, toggleEditMode} = messageStore;

    switch(type){
        case 'publish':
            return(<button type='submit' className='mt-5 p-4 w-full bg-app-btn text-black font-bold text-xl rounded'>{content}</button>);
        case 'edit':
        default:
            return(<>
            <button className={`fixed transition-all duration-300 ${editMode ? '-bottom-24 ' : 'bottom-0'} right-0 m-5 p-2 rounded bg-app-btn`} onClick={() => toggleEditMode(undefined)}>
                <section className='relative flex w-auto h-50px items-center'>
                <img src={Pen} alt='Icon of a pen'/>
                </section>            
                
            </button>
            <button className={`fixed transition-all duration-300 ${!editMode ? '-top-20 ' : 'top-0'} right-0 mx-5 p-2 rounded-b bg-app-btn`} onClick={() => toggleEditMode(undefined)}>
                <section className='relative w-7 h-10'>
                <img className='absolute bottom-0' src={Cancel} alt='Icon for canceling edit of message'/>
                </section>            
                
            </button>
            </>
            );
    }

}

export default observer(Button);