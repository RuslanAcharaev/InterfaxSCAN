import React from 'react';
import {Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import PickIcon from "../../assets/images/search/pick-icon.svg?react";
import {controlPropType, errorPropType} from "../../utils/propTypes.js";
import PropTypes from "prop-types";

const DateRangeFields = ({ control, errors, startDateValue, endDateValue}) => {
    const validateStartDate = (value) => {
        const selectedDate = new Date(value);
        if (endDateValue) {
            return selectedDate <= new Date(endDateValue) ? true : "Дата начала не может быть позже даты конца";
        }
    }

    const validateEndDate = (value) => {
        const selectedDate = new Date(value);
        if (startDateValue) {
            return selectedDate >= new Date(startDateValue) ? true : "Дата конца не может быть ранее даты начала";
        }
    }

    return (
        <div className="form-group">
            <label htmlFor="date">
                Диапазон поиска
                <span className={`required-mark ${errors.startDate || errors.endDate ? 'error' : ''} `}>*</span>
            </label>
            <div className="input-wrapper">
                <div className="date-range-wrapper">
                    <Controller
                        control={control}
                        name="startDate"
                        rules={{
                            required: "Обязательное поле",
                            validate: validateStartDate
                        }}
                        render={({field}) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => {
                                    field.onChange(date);
                                    field.onBlur();
                                }}
                                onBlur={field.onBlur}
                                placeholderText="Дата начала"
                                locale={ru}
                                dateFormat="dd.MM.yyyy"
                                maxDate={new Date()}
                                showMonthDropdown
                                showYearDropdown
                                yearDropdownItemNumber={5}
                                dropdownMode="scroll"
                                enableTabLoop={false}
                                showIcon
                                icon={<PickIcon/>}
                                className={errors.startDate ? "error" : ""}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="endDate"
                        rules={{
                            required: "Обязательное поле",
                            validate: validateEndDate
                        }}
                        render={({field}) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => {
                                    field.onChange(date);
                                    field.onBlur();
                                }}
                                onBlur={field.onBlur}
                                placeholderText="Дата конца"
                                locale={ru}
                                dateFormat="dd.MM.yyyy"
                                maxDate={new Date()}
                                showMonthDropdown
                                showYearDropdown
                                yearDropdownItemNumber={5}
                                dropdownMode="scroll"
                                enableTabLoop={false}
                                showIcon
                                icon={<PickIcon/>}
                                className={errors.endDate ? "error" : ""}
                            />
                        )}
                    />
                </div>
                <div className="error-container">
                    {errors.startDate ? (
                        <span className="error-message">{errors.startDate.message}</span>
                    ) : errors.endDate && (
                        <span className="error-message">{errors.endDate.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

DateRangeFields.propTypes = {
    control: controlPropType.isRequired,
    errors: PropTypes.shape({
        startDate: errorPropType,
        endDate: errorPropType
    }),
    startDateValue: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
      PropTypes.oneOf([null, undefined, ''])
    ]),
    endDateValue: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
      PropTypes.oneOf([null, undefined, ''])
    ])
}

export default DateRangeFields;