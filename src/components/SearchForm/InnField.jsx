import React from 'react';
import PropTypes from "prop-types";

const InnField = ({ register, errors, innValue }) => {
    const validateInn = (value) => {
        const checkDigit = (inn, coefficients) => {
            let n = 0;
            for (let i in coefficients) {
                n += coefficients[i] * inn[i];
            }
            return parseInt(n % 11 % 10);
        }

        const n10 = checkDigit(value, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        return n10 === parseInt(value[9]) ? true : "Введите корректные данные";
    }

    return (
        <div className="form-group">
            <label htmlFor="inn">
                ИНН компании
                <span className={`required-mark ${errors.inn ? 'error' : ''} `}>*</span>
            </label>
            <div className="input-wrapper">
                <input
                    id="inn"
                    placeholder="10 цифр"
                    className={innValue && errors.inn ? "error" : ""}
                    {
                        ...register("inn", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Введите ровно 10 цифр"
                            },
                            validate: validateInn,
                        })
                    }
                />
                <div className="error-container">
                    {errors.inn && (
                        <span className="error-message">{errors.inn.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

InnField.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        inn: PropTypes.shape({
            message: PropTypes.string,
        })
    }),
    innValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default InnField;