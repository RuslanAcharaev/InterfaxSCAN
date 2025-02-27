import React from 'react';
import '../styles/pages/MainPage.scss'
import Carousel from "../components/MainPage/Carousel.jsx";
import TariffCards from "../components/MainPage/TariffCards.jsx";
import {Link} from "react-router";
import {useAuthStore} from "../store/authStore.js";

const MainPage = () => {

    const { isAuthenticated } = useAuthStore();

    return (
        <>
            <section className="about">
                <div className="container">
                    <div className="about__content">
                        <h1 className="about__content__title">
                            сервис по поиску публикаций <br/>
                            о компании <br/>
                            по его ИНН
                        </h1>
                        <p className="about__content__desc">
                            Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                        </p>
                        <Link to="/search"
                              className={`about__content__link ${isAuthenticated ? 'visible' : ''}`}
                        >Запросить данные</Link>
                    </div>
                </div>
            </section>
            <section className="features">
                <div className="container">
                    <div className="features__content">
                        <h2 className="features__content__title">
                            Почему именно мы
                        </h2>
                        <Carousel />
                    </div>
                </div>
            </section>
            <section className="tariffs">
                <div className="container">
                    <div className="tariffs__content">
                        <h2 className="tariffs__content__title">
                            Наши тарифы
                        </h2>
                        <TariffCards />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainPage;