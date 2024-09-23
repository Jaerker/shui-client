import WaveOne from '../../Assets/waves/w1.svg';
import WaveTwo from '../../Assets/waves/w2.svg';
import WaveThree from '../../Assets/waves/w3.svg';

const Footer = () => {
    return (
        <footer className='fixed -bottom-10 overflow-hidden w-dvw flex flex-col items-center -z-10'>
            <img className='absolute bottom-0 max-w-none' src={WaveTwo} alt='wave' />
            <img className='max-w-none' src={WaveOne} alt='wave' />
            <img className='absolute bottom-0 max-w-none' src={WaveThree} alt='wave' />
        </footer>
    );
}

export default Footer;