import React, {useEffect, useState} from 'react';
import LeftIcon from "../../assets/images/main/chevron-left.svg?react";
import RightIcon from "../../assets/images/main/chevron-right.svg?react";
import WatchIcon from "../../assets/images/main/icon-watch.svg?react";
import SearchIcon from "../../assets/images/main/icon-search.svg?react";
import LockIcon from "../../assets/images/main/icon-lock.svg?react";
import '../../styles/components/Carousel.scss'


const Carousel = () => {
    const [visibleCount, setVisibleCount] = useState(3);
    const [startIndex, setStartIndex] = useState(3);

    const initialCards = [
        {
            id: 1,
            text: "Высокая и оперативная скорость обработки заявки",
            icon: <WatchIcon/>
        },
        {
            id: 2,
            text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
            icon: <SearchIcon/>
        },
        {
            id: 3,
            text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
            icon: <LockIcon/>
        }
    ]

    const cards = Array(3)
        .fill(initialCards)
        .flat()
        .map((card, index) => ({
            ...card,
            id: index + 1
        }));

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setVisibleCount(1);
            } else if (window.innerWidth <= 1200) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const visibleCards = cards.slice(startIndex, startIndex + visibleCount);

    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleNext = () => {
        if (startIndex + visibleCount < cards.length) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div className="slider-container">
            <button className="btn__left" onClick={handlePrevious} disabled={startIndex === 0}>
                <LeftIcon/>
            </button>
            <div className="cards-container">
                {visibleCards.map((card) => (
                    <div className="card" key={card.id}>
                        <div className="card__icon">
                            {card.icon}
                        </div>
                        <p className="card__text">{card.text}</p>
                    </div>
                ))}
            </div>
            <button className="btn__right" onClick={handleNext} disabled={startIndex + visibleCount >= cards.length}>
                <RightIcon/>
            </button>
        </div>
    );
};

export default Carousel;