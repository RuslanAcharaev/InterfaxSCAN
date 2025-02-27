import React, {useEffect, useState} from 'react';
import '../styles/components/Header.scss'
import Toggle from "./MainPage/Toggle.jsx";
import HeaderLogo from "./Header/HeaderLogo.jsx";
import HeaderNavigation from "./Header/HeaderNavigation.jsx";
import HeaderAuth from "./Header/HeaderAuth.jsx";
import HeaderProfile from "./Header/HeaderProfile.jsx";
import CompanyLimits from "./Header/CompanyLimits.jsx";
import {useAuthStore} from "../store/authStore.js";

const Header = () => {

    const { isAuthenticated } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile && isOpen) {
            setIsOpen(false);
        }
    }, [isMobile]);

    const toggleMenu = () => {
        if (isOpen) {
            setIsClosing(true);
            setIsOpen(false);
            setTimeout(() => {
                setIsClosing(false);
            }, 300);
        } else {
            setIsOpen(true);
        }
    }

    const isMobileMenu = isMobile && isOpen;

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <HeaderLogo isMobileMenu={isMobileMenu}/>
                    <div className="header__content__wrapper">
                        <HeaderNavigation isMobileMenu={isMobileMenu} isClosing={isClosing} toggleMenu={toggleMenu} />
                        {isAuthenticated && <CompanyLimits/>}
                        {isAuthenticated ?
                            <HeaderProfile isMobileMenu={isMobileMenu} isClosing={isClosing} toggleMenu={toggleMenu} />
                            :
                            <HeaderAuth isMobileMenu={isMobileMenu} isClosing={isClosing} toggleMenu={toggleMenu} />
                        }
                    </div>
                    <div className="header__content__toggle">
                        <Toggle isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;