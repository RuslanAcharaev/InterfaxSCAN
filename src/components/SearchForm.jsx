import React from 'react';
import {useForm} from "react-hook-form";
import "../styles/components/SearchForm.scss"
import "react-datepicker/dist/react-datepicker.css";
import {useSearchStore} from "../store/searchStore.js";
import {useNavigate} from "react-router";
import InnField from "./SearchForm/InnField.jsx";
import ToneSelect from "./SearchForm/ToneSelect.jsx";
import DocumentsLimit from "./SearchForm/DocumentsLimit.jsx";
import DateRangeFields from "./SearchForm/DateRangeFields.jsx";
import CheckboxGroup from "./SearchForm/CheckboxGroup.jsx";

const SearchForm = () => {

    const {
        objectSearch,
        error,
        isLoading,
        isDocumentsLoading
    } = useSearchStore();
    let navigate = useNavigate();

    const {
        control,
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            inn: "",
            documents: "",
            startDate: "",
            endDate: "",
            tone: "any",
            maxFullness: false,
            inBusinessNews: false,
            onlyMainRole: false,
            onlyWithRiskFactors: false,
            excludeTechNews: false,
            excludeAnnouncements: false,
            excludeDigests: false,
        }
    })

    const onSubmit = async (values) => {
        navigate("/result");
        const success = await objectSearch(values);
        if (!success) {
            console.log(error)
        }
    }

    const innValue = watch("inn");
    const documentsValue = watch("documents");
    const startDateValue = watch("startDate");
    const endDateValue = watch("endDate");

    const loading = isLoading || isDocumentsLoading

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <div className="main-wrapper">
                <InnField register={register} errors={errors} innValue={innValue} />
                <ToneSelect register={register} />
                <DocumentsLimit register={register} errors={errors} documentsValue={documentsValue} />
                <DateRangeFields control={control} errors={errors} startDateValue={startDateValue}
                                 endDateValue={endDateValue} />
            </div>

            <div className="secondary-wrapper">
                <CheckboxGroup register={register} />

                <div className="submit-group">
                    <button type='submit' disabled={!isValid}
                            className={`submit-button ${loading ? 'loading' : ''}`}>
                        {loading ? 'Поиск...' : 'Поиск'}
                    </button>
                    <p className="required-notification">* Обязательные к заполнению поля</p>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;