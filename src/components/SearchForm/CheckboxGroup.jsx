import React from 'react';
import PropTypes from "prop-types";

const CheckboxGroup = ({ register }) => {
    const checkboxes = [
        {name: "maxFullness", label: "Признак максимальной полноты"},
        {name: "inBusinessNews", label: "Упоминания в бизнес-контексте"},
        {name: "onlyMainRole", label: "Главная роль в публикации"},
        {name: "onlyWithRiskFactors", label: "Публикации только с риск-факторами"},
        {name: "excludeTechNews", label: "Включать технические новости рынков"},
        {name: "excludeAnnouncements", label: "Включать анонсы и календари"},
        {name: "excludeDigests", label: "Включать сводки новостей"}
    ];

    return (
        <div className="checkbox-group">
            {checkboxes.map(({name, label}) => (
                <div key={name} className="checkbox-wrapper">
                    <label htmlFor={name} className="checkbox-label">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                            {...register(name)}
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-text">{label}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

CheckboxGroup.propTypes = {
    register: PropTypes.func.isRequired,
}

export default CheckboxGroup;