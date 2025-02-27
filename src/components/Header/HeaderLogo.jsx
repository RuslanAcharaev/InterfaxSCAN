import React from 'react';
import Logo from '../../assets/images/header/logo-color.svg?react'
import LogoAlpha from '../../assets/images/footer/logo-alpha.svg?react'
import '../../styles/components/HeaderLogo.scss'
import PropTypes from "prop-types";

const HeaderLogo = ({isMobileMenu}) => {
    return (
        <div className={`logo ${
            isMobileMenu ? 'logo-menu' : ''
        }`}>
            <LogoAlpha className="logo-alpha"/>
            <Logo className="logo-color"/>
        </div>
    );
};

HeaderLogo.propTypes = {
    isMobileMenu: PropTypes.bool,
}

export default HeaderLogo;