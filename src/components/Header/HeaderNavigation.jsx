import React from 'react';
import '../../styles/components/HeaderNavigation.scss'
import {Link} from "react-router";
import PropTypes from "prop-types";

const HeaderNavigation = ({isMobileMenu, isClosing, toggleMenu}) => {

    const handleClick = () => {
        if (isMobileMenu) {
            toggleMenu();
        }
    }

    return (
        <nav
            className={`nav ${
                isMobileMenu ? 'nav-menu'
                    : isClosing ? 'nav-menu-closing'
                        : ''
            }`}
        >
            <Link onClick={handleClick} to="/" className="nav__link">Главная</Link>
            <Link onClick={handleClick} to="/" className="nav__link">Тарифы</Link>
            <Link onClick={handleClick} to="/" className="nav__link">FAQ</Link>
        </nav>
    );
};

HeaderNavigation.propTypes = {
    isMobileMenu: PropTypes.bool,
    isClosing: PropTypes.bool,
    toggleMenu: PropTypes.func,
}

export default HeaderNavigation;