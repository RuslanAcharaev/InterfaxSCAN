import React from 'react';
import PropTypes from "prop-types";

const DocumentsLimit = ({register, errors, documentsValue}) => {
    const validateDocuments = (value) => {
        const num = parseInt(value)
        return !isNaN(num) && num >= 1 && num <= 1000 ? true : "Введите число от 1 до 1000";
    }

    return (
        <div className="form-group">
            <label htmlFor="documents">
                Количество документов в выдаче
                <span className={`required-mark ${errors.documents ? 'error' : ''} `}>*</span>
            </label>
            <div className="input-wrapper">
                <input
                    id="documents"
                    placeholder="От 1 до 1000"
                    className={documentsValue && errors.documents ? "error" : ""}
                    {
                        ...register("documents", {
                            required: "Обязательное поле",
                            min: {
                                value: 1,
                                message: "Число должно быть не менее 1"
                            },
                            max: {
                                value: 1000,
                                message: "Число должно быть не более 1000"
                            },
                            validate: validateDocuments,
                        })
                    }
                />
                <div className="error-container">
                    {errors.documents && (
                        <span className="error-message">{errors.documents.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

DocumentsLimit.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        documents: PropTypes.shape({
            message: PropTypes.string,
        }),
    }),
    documentsValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default DocumentsLimit;