import React from 'react';
import LogoAlpha from '../assets/images/footer/logo-alpha.svg?react'
import '../styles/components/Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__content__logo">
                        <LogoAlpha />
                    </div>
                    <div className="footer__content__text">
                        <div className="contacts">
                            <p>г. Москва, Цветной б-р, 40</p>
                            <p>+7 495 771 21 11</p>
                            <p>info@skan.ru</p>
                        </div>
                        <div className="copyright">
                            <p>Copyright. 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;