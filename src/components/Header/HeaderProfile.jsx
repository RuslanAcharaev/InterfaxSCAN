import React from 'react';
import '../../styles/components/HeaderProfile.scss'
import {useNavigate} from "react-router";
import {useAuthStore} from "../../store/authStore.js";
import avatar from "../../assets/images/header/avatar.png";
import PropTypes from "prop-types";

const HeaderProfile = ({ isMobileMenu, isClosing, toggleMenu }) => {

    let navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();

        if (isMobileMenu) {
            toggleMenu();
        }
        navigate("/");
    };

    return (
        <div className={`profile_nav ${
            isMobileMenu ? 'profile_nav-menu'
                : isClosing ? 'profile_nav-menu-closing'
                    : ''
        }`}>
            <div className="text-wrapper">
                <p className="user_name">Алексей А.</p>
                <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
            <div className="icon-wrapper">
                <img src={avatar} alt="avatar image"/>
            </div>
        </div>
    );
};

HeaderProfile.propTypes = {
    isMobileMenu: PropTypes.bool,
    isClosing: PropTypes.bool,
    toggleMenu: PropTypes.func,
}

export default HeaderProfile;