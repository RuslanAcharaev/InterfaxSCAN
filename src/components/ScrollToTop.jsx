import React, {useEffect, useState} from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 3000) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="scroll-to-top-wrapper">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="scroll-to-top"
                >
                    <Chevron className="scroll-to-top__icon"/>
                </button>
            )}
        </div>
    );
};
import "../styles/components/ScrollToTop.scss";

import Chevron from "../assets/images/result/chevron-left.svg?react"

export default ScrollToTop;