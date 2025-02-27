import React from 'react';
import '../../styles/components/HeaderAuth.scss'
import {useNavigate} from "react-router";
import PropTypes from "prop-types";

const HeaderAuth = ({ isMobileMenu, isClosing, toggleMenu }) => {

    let navigate = useNavigate();

    const handleLogin = () => {
        if (isMobileMenu) {
            toggleMenu();
        }
        navigate("/login");
    };

    return (
        <div className={`auth_nav ${
            isMobileMenu ? 'auth_nav-menu'
                : isClosing ? 'auth_nav-menu-closing'
                    : ''
        }`}>
            <button className="btn__sign-up">Зарегистрироваться</button>
            <button onClick={handleLogin} className="btn__log-in">Войти</button>
        </div>
    );
};

HeaderAuth.propTypes = {
    isMobileMenu: PropTypes.bool,
    isClosing: PropTypes.bool,
    toggleMenu: PropTypes.func,
}

export default HeaderAuth;