import React from 'react';
import "../../styles/components/CompanyLimits.scss"
import {useAuthStore} from "../../store/authStore.js";
import Spinner from '../../assets/images/header/spinner-icon.svg?react'

const CompanyLimits = () => {

    const {usedCompanyCount, companyLimit, isInfoLoading} = useAuthStore();

    return (
        <div className="info">
            {isInfoLoading ? (
                <div className="loader">
                    <Spinner className="loader__spinner"/>
                </div>
            ) : (
                <div className="info-container">
                    <div className="used_companies">
                        <p className="used_companies-title">Использовано компаний</p>
                        <p className="used_companies-value">{usedCompanyCount}</p>
                    </div>
                    <div className="company_limit">
                        <p className="company_limit-title">Лимит по компаниям</p>
                        <p className="company_limit-value">{companyLimit}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyLimits;