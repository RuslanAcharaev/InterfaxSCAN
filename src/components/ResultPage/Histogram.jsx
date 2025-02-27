import React from 'react';
import LeftChevron from '../../assets/images/result/chevron-left.svg?react'
import RightChevron from '../../assets/images/result/chevron-right.svg?react'
import Spinner from '../../assets/images/result/spinner-icon.svg?react'
import '../../styles/components/Histogram.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {useSearchStore} from "../../store/searchStore.js";
import PropTypes from "prop-types";

const Histogram = ({processedData}) => {

    const {isLoading} = useSearchStore();

    const isNotActive = isLoading || processedData.length === 0

    return (
        <div className="histogram">
            <button className={`histogram__button histogram__button-prev ${isNotActive ? 'not-active' : ''}`}>
                <LeftChevron className="btn-left"/>
            </button>
            <div className="histogram__content">
                <div className="histogram__content__header">
                    <p className="header__date">Период</p>
                    <p className="header__total">Всего</p>
                    <p className="header__risk">Риски</p>
                </div>

                {isLoading ? (
                    <div className="histogram__content__body">
                        <div className="loader">
                            <Spinner className="loader__spinner"/>
                            <p className="loader__description">Загружаем данные</p>
                        </div>
                    </div>
                ) : (
                    processedData.length > 0 ? (
                        <Swiper
                            modules={[Navigation]}
                            watchOverflow={false}
                            spaceBetween={0}
                            slidesPerView="auto"
                            navigation={{
                                prevEl: '.histogram__button-prev',
                                nextEl: '.histogram__button-next'
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                429: {
                                    slidesPerView: "auto"
                                }
                            }}
                            className="histogram__content__body"
                        >
                            {processedData.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                >
                                    <div className="card">
                                        <p className="card__date">{item.date}</p>
                                        <p className="card__total">{item.totalDocs}</p>
                                        <p className="card__risks">{item.risks}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="histogram__content__body">
                            <div className="loader">
                                <p className="loader__description">Данные не найдены</p>
                            </div>
                        </div>
                    )
                )}

            </div>
            <button className={`histogram__button histogram__button-next ${isNotActive ? 'not-active' : ''}`}>
                <RightChevron className="btn-right"/>
            </button>
        </div>
    );
};

Histogram.propTypes = {
    processedData: PropTypes.array.isRequired,

}

export default Histogram;