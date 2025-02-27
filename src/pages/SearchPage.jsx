import React from 'react';
import "../styles/pages/SearchPage.scss"
import SearchForm from "../components/SearchForm.jsx";
import SearchImage from "../assets/images/search/search-image.svg?react"

const SearchPage = () => {


    return (
        <>
            <section className="search">
                <div className="container">
                    <div className="search__content">
                        <h1 className="search__content__title">
                            Найдите необходимые данные в пару кликов.
                        </h1>
                        <p className="search__content__description">
                            Задайте параметры поиска.<br/>
                            Чем больше заполните, тем точнее поиск.
                        </p>
                        <div className="search__content__search-wrapper">
                            <SearchForm />
                            <SearchImage className="search-image"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchPage;