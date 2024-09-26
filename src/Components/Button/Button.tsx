import Pen from '../../Assets/pen.svg';
import Cancel from '../../Assets/cancel.svg';
import Search from '../../Assets/search-alt-2-svgrepo-com.svg';
import Filter from '../../Assets/filter-svgrepo-com.svg';
import { useStore } from '../../Stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

type Props = {
    type: 'edit' | 'publish' | 'filter' | 'search' | 'cancel',
    content?: string
}

const Button = ({type, content}: Props) => {

    const {messageStore} = useStore();
    const {
        editMode, 
        toggleEditMode, 
        
        sortMode, 
        toggleSortMode, 
        
        setSortString, 

        searchMode, 
        handleSearchSubmit,         
        searchValue,
        setSearchValue,
        handleSearchChange,
    } = messageStore;

    useEffect(()=>{
        if(searchMode)
            setSearchValue('');
            
    },[searchMode]);

    const handleSortChanged = (event: any) => {
        const {value} = event.target;
        setSortString(value);
        toggleSortMode();
    }



    switch(type){
        case 'publish':
            return(<button type='submit' className='mt-5 p-4 w-full bg-app-btn text-black font-bold text-xl rounded'>{content}</button>);
        case 'search':
            return (
                <section className={`flex items-end transition-all duration-300 overflow-hidden  ${sortMode ? 'h-0 w-0 opacity-0' : searchMode ? 'w-4/5 h-20' : 'w-btn h-14 ml-2'} rounded-b bg-app-btn`}>
    
                    <section className={`transition-all duration-300 bg-app-btn overflow-hidden ${searchMode ? 'w-full ' : 'w-0 h-0'}`}>
                        <form className='p-2 w-full flex flex-col gap-1' onSubmit={handleSearchSubmit} >
                            <label htmlFor='username'>Sök efter användare eller ord i text</label>
                            <input required type='text' className='rounded text-black p-2 w-full' name='username' placeholder='användarnamn' value={searchValue} onChange={handleSearchChange} />    
                        </form>
                    </section>            
                        <button className={`transition-all duration-300 mt-2 px-1  ${searchMode ? 'pb-3' : 'pb-1'}`} onClick={handleSearchSubmit}>
                            <section className='relative w-9 h-10'>
                                <img className='absolute bottom-0 ' src={Search} alt='Icon for searching after usernames'/>
                            </section>
                        </button>
                    
                    
                </section>)
        case 'filter':
            return(
            <section className={`flex items-end transition-all duration-300 overflow-hidden  ${searchMode ? 'w-0 h-0 opacity-0' : sortMode ? 'w-4/5 h-24 pr-1' : 'w-btn h-14'} right-0 rounded-b bg-app-btn`}>
                <section className={` flex-1 transition-all duration-300 bg-app-btn overflow-hidden ${sortMode ? 'w-filter-active h-26 ' : 'w-0 h-0'}`}>
                <form className='p-2' >
                    <section className={`transition-all duration-300 grid h-20`}>
                        <label htmlFor='filter' className='text-center'>Sortera efter</label>
                        <select name='filter' id='filter' defaultValue='createdAt-asc' className='text-black rounded' onChange={handleSortChanged}>
                            <option id='createdAt-asc'  value='createdAt-asc'>Datum - Nyaste</option>
                            <option id='createdAt-desc' value='createdAt-desc'>Datum - Äldst</option>
                        </select>
                    </section>
                </form>
                </section>            
                <button className={`flex-none transition-all duration-300 mx-auto pt-1 pr-[2px] ${sortMode ? 'pb-2':'pb-1'}`} onClick={() => toggleSortMode()}>
                    <section className='relative w-9 h-10'>
                        <img className='absolute bottom-0' src={Filter} alt='Icon for filtering messages'/>
                    </section>
                </button>
            </section>);
        case 'cancel':
            return (<section className={`transition-all duration-300 fixed pl-5 z-10 w-screen max-w-xl flex justify-end items-start ${!editMode ? '-top-20':'top-0'}`}>
            <button className={`transition-all w-btn duration-300 ${!editMode ? '-top-20 ' : 'top-0'} right-0 mx-5 p-2 rounded-b bg-app-btn`} onClick={() => toggleEditMode(undefined)}>
                <section className='relative w-7 h-10'>
                <img className='absolute bottom-0' src={Cancel} alt='Icon for canceling edit of message'/>
                </section>            
                
            </button>
            </section>);
        case 'edit':
        default:
            return(<section className={`fixed transition-all duration-300 w-full max-w-xl flex items-center justify-end ${editMode ? '-bottom-24 ' : 'bottom-0'}`}>
            <button className={`absolute m-5 p-2 rounded bg-app-btn bottom-0`} onClick={() => toggleEditMode(undefined)}>
                <section className='relative flex w-auto h-50px items-center'>
                <img src={Pen} alt='Icon of a pen'/>
                </section>            
                
            </button>
            
            </section>
            );
    }

}

export default observer(Button);