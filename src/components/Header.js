import React from 'react';
import headerLogo from '../images/header__logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={headerLogo} className="header__logo" alt="Место" />
        </header>
    );
}
export default Header;