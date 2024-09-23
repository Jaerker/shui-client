import Logo from '../../Assets/logo.svg';

const Header = () => {
    return (
        <header className='fixed top-0 left-0 z-10'>
            <img src={Logo} alt="Logo" />
        </header>
    );
}

export default Header;