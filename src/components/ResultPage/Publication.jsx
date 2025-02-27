import React from 'react';
import '../../styles/components/Publication.scss'
import PropTypes from "prop-types";

const Publication = ({document}) => {

    const plural = (number) => {

        if (number % 100 <= 14 && number >= 11) {
            return '';
        } else if (number % 10 <= 4 && number % 10 >= 2) {
            return 'а';
        } else if (number % 10 === 1) {
            return 'о';
        } else {
            return '';
        }
    }

    const lengthLimit = (string) => {
        if (string.length >= 90) {
            return string.slice(0, 90) + '...'
        } else {
            return string
        }

    }

    return (
        <div className="publication">
            <div className="publication__header">
                <p className="issueDate">{document.issueDate}</p>
                <a href={document.url} className="sourceName">{document.sourceName}</a>
            </div>
            <div className="publication__body">
                <h3 className="publication__body__title">
                    {lengthLimit(document.titleText)}
                </h3>
                <div className="publication__body__tags">
                    {document.tags.length > 0 ?
                        (document.tags.map((tag, index) => (
                                <div className="single-tag" key={index}>
                                    {tag}
                                </div>
                            ))
                        )
                    : (
                            <div className="single-tag">
                                Технические новости
                            </div>
                        )}

                </div>
                <div className="publication__body__image-wrapper">
                    <img src={
                        document.imageSource
                        ? document.imageSource
                        : '../../src/assets/images/result/temp-img2.svg'
                    } alt="publication image"
                         className="publication-image"/>
                </div>
                <div className="publication__body__text-wrapper">
                    <pre className="text">
                        {document.contentText}
                    </pre>
                </div>
            </div>
            <div className="publication__footer">
                <a href={document.url} className="source-url">
                    <button className="source-btn">Читать в источнике</button>
                </a>
                <p className="word-count">{document.wordCount} слов{plural(document.wordCount)}</p>
            </div>
        </div>
    );
};

Publication.propTypes = {
    document: PropTypes.shape({
        contentText: PropTypes.string,
        issueDate: PropTypes.string,
        titleText: PropTypes.string,
        url: PropTypes.string,
        tags: PropTypes.array,
        imageSource: PropTypes.string,
        wordCount: PropTypes.number,
        sourceName: PropTypes.string,
    })
};

export default Publication;