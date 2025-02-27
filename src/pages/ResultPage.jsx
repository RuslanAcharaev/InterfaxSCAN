import React, {useEffect, useState} from 'react';
import HeadingImage from '../assets/images/result/heading-image.svg?react'
import '../styles/pages/ResultPage.scss'
import Histogram from "../components/ResultPage/Histogram.jsx";
import Publication from "../components/ResultPage/Publication.jsx";
import {useSearchStore} from "../store/searchStore.js";
import {parseDocuments} from "../utils/parseDocument.js";
import {processedData, plural} from "../utils/processHistogram.js";
import Spinner from "../assets/images/result/spinner-icon.svg?react";

const ResultPage = () => {

    const histogramData = useSearchStore(state => state.histogramData);
    const documents = useSearchStore(state => state.documents);
    const isLoading = useSearchStore(state => state.isLoading);
    const isDocumentsLoading = useSearchStore(state => state.isDocumentsLoading);
    const moreToLoad = useSearchStore(state => state.moreToLoad);
    const getDocuments = useSearchStore(state => state.getDocuments);

    const [readyDocuments, setDocuments] = useState([]);

    const data = processedData(histogramData)
    const wordEnding = plural(data.length)

    useEffect(() => {
        if (documents?.length) {
            const parsedPublications = documents.map(document => parseDocuments(document));
            setDocuments(parsedPublications);
        } else {
            setDocuments([])
        }
    }, [documents]);

    const handleShowMore = async () => {
        if (!isDocumentsLoading && moreToLoad) {
            await getDocuments();
        }
    };

    return (
        <>
            <section className="heading">
                <div className="container">
                    <div className="heading__content">
                        <div className="heading__content__text">
                            <h1 className="title">
                                Ищем. Скоро будут результаты
                            </h1>
                            <p className="description">
                                Поиск может занять некоторое время, просим сохранять терпение.
                            </p>
                        </div>
                        <HeadingImage className="heading__content__image"/>
                    </div>
                </div>
            </section>

            <section className="summary">
                <div className="container">
                    <div className="summary__content">
                        <h2 className="summary__content__title">
                            Общая сводка
                        </h2>
                        <p className="summary__content__description">
                            {isLoading ? 'Ищем варианты' :
                                (data.length ? (
                                        `Найдено ${data.length} вариант${wordEnding}`
                                    ) : ('Данные не найдены')
                                )
                            }
                        </p>
                        <div className="summary__content__histogram">
                            <Histogram processedData={data}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="documents">
                <div className="container">
                    <div className="documents__content">
                        <h2 className="documents__content__title">
                            Список документов
                        </h2>
                        <div className={
                            `documents__content__publications ${
                                isLoading || (isDocumentsLoading && !documents?.length) ? 'loading' : ''}`
                        }>
                            {isLoading || (isDocumentsLoading && !documents?.length) ? '' :
                                (readyDocuments.map((doc, index) => (
                                    <Publication key={index} document={doc}/>
                                )))
                            }
                        </div>

                        {isLoading || isDocumentsLoading ?
                            (
                                <div className="loader">
                                    <Spinner className="loader__spinner"/>
                                    <p className="loader__description">Загружаем документы</p>
                                </div>
                            ) : (
                                <button
                                    onClick={handleShowMore}
                                    className={`show-more-btn ${moreToLoad ? 'visible' : ''}`}
                                >
                                    Показать больше
                                </button>
                            )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResultPage;