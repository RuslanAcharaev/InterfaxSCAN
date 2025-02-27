import React from 'react';
import Bulb from "../../assets/images/main/image-bulb.svg?react";
import Target from "../../assets/images/main/image-target.svg?react";
import Notebook from "../../assets/images/main/image-notebook.svg?react";
import "../../styles/components/TariffCards.scss"
import {Link} from "react-router";
import {useAuthStore} from "../../store/authStore.js";

const TariffCards = () => {


    const { isAuthenticated } = useAuthStore();
    const currentTariff = 'Beginner'

    const tariffs = [
        {
            id: 1,
            title: "Beginner",
            description: "Для небольшого исследования",
            newPrice: "799 ₽",
            oldPrice: "1 200 ₽",
            payment: "или 150 ₽/мес. при рассрочке на 24 мес.",
            benefits: [
                {
                    id: 1,
                    benefit: "Безлимитная история запросов",
                },
                {
                    id: 2,
                    benefit: "Безопасная сделка"
                },
                {
                    id: 3,
                    benefit: "Поддержка 24/7"
                }
            ],
            color: "#FFB64F",
            icon: <Bulb/>
        },
        {
            id: 2,
            title: "Pro",
            description: "Для HR и фрилансеров",
            newPrice: "1 299 ₽",
            oldPrice: "2 600 ₽",
            payment: "или 279 ₽/мес. при рассрочке на 24 мес.",
            benefits: [
                {
                    id: 1,
                    benefit: "Все пункты тарифа Beginner",
                },
                {
                    id: 2,
                    benefit: "Экспорт истории"
                },
                {
                    id: 3,
                    benefit: "Рекомендации по приоритетам"
                }
            ],
            color: "#7CE3E1",
            icon: <Target/>
        },
        {
            id: 3,
            title: "Business",
            description: "Для корпоративных клиентов",
            newPrice: "2 379 ₽",
            oldPrice: "3 700 ₽",
            payment: <br/>,
            benefits: [
                {
                    id: 1,
                    benefit: "Все пункты тарифа Pro",
                },
                {
                    id: 2,
                    benefit: "Безлимитное количество запросов"
                },
                {
                    id: 3,
                    benefit: "Приоритетная поддержка"
                }
            ],
            color: "#000000",
            icon: <Notebook/>
        }
    ]

    return (
        <div className="cards">
            {tariffs.map((tariff) => {
                const isCurrentTariff = isAuthenticated && tariff.title === currentTariff;

                return (
                    <div
                        className={`card ${isCurrentTariff ? 'current' : ''}`}
                        key={tariff.id}
                        style={{
                            '--card-color': tariff.color,
                            '--text-color': tariff.color === '#000000' ? '#ffffff' : '#000000'
                        }}
                    >
                        <div className="card__top">
                            <div className="card__top__text">
                                <h3 className="title">{tariff.title}</h3>
                                <p className="description">{tariff.description}</p>
                            </div>
                            <div className="card__top__icon">
                                {tariff.icon}
                            </div>
                        </div>
                        <div className="card__bottom">
                            <span
                                className={`card__bottom__badge ${isCurrentTariff ? 'current' : ''}`}
                            >
                                Текущий тариф
                            </span>
                            <div className="card__bottom__price">
                                <p className="new-price">{tariff.newPrice}</p>
                                <p className="old-price">{tariff.oldPrice}</p>
                            </div>
                            <p className="card__bottom__payment">
                                {tariff.payment}
                            </p>
                            <div className="card__bottom__tariff-content">
                                <h4 className="title">В тариф входит:</h4>
                                <ul className="benefits">
                                    {tariff.benefits.map((item) => {
                                        return (
                                            <li className="benefits__item" key={item.id}>{item.benefit}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <Link to="/"
                                  className={`card__bottom__link ${isCurrentTariff ? 'current' : ''}`}
                            >
                                {isCurrentTariff ? 'Перейти в личный кабинет' : 'Подробнее'}
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default TariffCards;