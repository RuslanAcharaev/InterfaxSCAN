import React from 'react';
import PropTypes from "prop-types";

const ToneSelect = ({ register }) => {
    return (
        <div className="form-group">
            <label htmlFor="tone">
                Тональность
            </label>
            <select
                id="select-tone"
                className="select-tone"
                {...register("tone", {
                    required: true,
                })}
            >
                <option value="any">Любая</option>
                <option value="positive">Позитивная</option>
                <option value="negative">Негативная</option>
            </select>
        </div>
    );
};

ToneSelect.propTypes = {
    register: PropTypes.func.isRequired,
}

export default ToneSelect;