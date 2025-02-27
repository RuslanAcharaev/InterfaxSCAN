import React from 'react';
import '../styles/pages/AuthPage.scss'
import LoginForm from "../components/LoginForm.jsx";


const AuthPage = () => {

    return (
        <>
            <section className="auth">
                <div className="container">
                    <div className="auth__content">
                        <h1 className="auth__content__title">
                            Для оформления подписки на тариф, необходимо авторизоваться.
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AuthPage;