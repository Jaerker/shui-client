import Pen from '../../Assets/pen.svg';

const Button = () => {
    return (
        <button className='absolute bottom-0 right-0 m-5 p-2 rounded-md bg-app-btn'>
            <img src={Pen} alt='Icon of a pen'/>
        </button>
    );
}

export default Button;