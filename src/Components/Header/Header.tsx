import { observer } from 'mobx-react-lite';
import Logo from '../../Assets/logo.svg';
import { useStore } from '../../Stores/store';
import Button from '../Button/Button';

const Header = () => {

    const {messageStore} = useStore();
    const {editMode} = messageStore;
    return (<>
        <img className='fixed top-0 pl-1 z-10' src={Logo} alt='Logo' />

        <header className={`transition-all duration-300 fixed  pr-5 z-10 w-dvw max-w-xl flex justify-between items-start ${editMode ? '-top-20':'top-0'}`}>
            <span className='flex-1'></span>
            <Button type='filter'/>
            <Button type='search'/>
        </header>
        <Button type='cancel'/>

    </>);
}

export default observer(Header);