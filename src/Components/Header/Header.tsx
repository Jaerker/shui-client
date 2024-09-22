import Logo from '../../Assets/logo.svg';

const Header = () => {
    return (
        <header className='absolute top-0 left-0'>
            <img src={Logo} alt="Logo" />
        </header>
    );
}

export default Header;