import React from 'react';
import '../../styles/components/Toggle.scss'
import PropTypes from "prop-types";

const Toggle = ({ isOpen, toggleMenu }) => {

    return (
        <div>
            <div
                className={`burger__container ${isOpen ? "burger__container__active" : ""}`}
                onClick={toggleMenu}
                role="button"
                aria-expanded={isOpen}
                aria-label="Toggle Menu"
            >
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </div>
        </div>
    );
};

Toggle.propTypes = {
    isOpen: PropTypes.bool,
    toggleMenu: PropTypes.func,
}

export default Toggle;