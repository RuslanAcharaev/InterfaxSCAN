import React from 'react';
import {useForm} from "react-hook-form";
import Google from "../assets/images/auth/googlelogo.svg?react";
import Facebook from "../assets/images/auth/facebooklogo.svg?react";
import Yandex from "../assets/images/auth/yandexlogo.svg?react";
import "../styles/components/LoginForm.scss"
import {useAuthStore} from "../store/authStore.js";
import {useNavigate} from "react-router";

const LoginForm = () => {

    let navigate = useNavigate();

    const {
        login,
        info,
        isLoading,
        error
    } = useAuthStore();

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch,
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            login: "",
            password: "",
        }
    })

    const onSubmit = async (values) => {
        const success = await login(
            values.login, values.password
        );
        if (success === true) {
            navigate("/");
            await info();
        } else {
            console.log(success.error)
        }
    }

    const validateLogin = (value) => {
        const phoneRegex = /^\+7\d{10}$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

        if (value.startsWith("+7")) {
            return phoneRegex.test(value) ? true : "Введите корректные данные";
        }

        return usernameRegex.test(value) ? true : "Введите корректные данные";
    };

    const loginValue = watch("login");
    const passwordValue = watch("password");

    return (
        <div className="form">
            <div className="form-header">
                <button className="login-btn">
                    Войти
                </button>
                <button className="signup-btn">
                    Зарегистрироваться
                </button>
            </div>
            <div className="form-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="login">
                            Логин или номер телефона:
                        </label>
                        <div className="input-wrapper">
                            <input
                                id="login"
                                className={loginValue && errors.login ? "error" : ""}
                                {
                                    ...register("login", {
                                        required: true,
                                        validate: validateLogin
                                    })
                                }
                            />
                            <div className="error-container">
                                {errors.login && (
                                    <span className="error-message">{errors.login.message}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Пароль:
                        </label>
                        <div className="input-wrapper">
                            <input
                                id="password"
                                type="password"
                                className={passwordValue && errors.password ? "error" : ""}
                                {
                                    ...register("password", {
                                        required: true,
                                        minLength: {
                                            value: 6,
                                            message: "Неправильный пароль"
                                        }
                                    })
                                }
                            />
                            <div className="error-container">
                                {errors.password || error && (
                                    <span className="error-message">{errors?.password?.message || error}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={!isValid || isLoading}
                        className={`submit-btn ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </button>
                </form>
                <div className="password-recovery">
                    <a href="#">Восстановить пароль</a>
                </div>
            </div>
            <div className="form-footer">
                <p className="alt-login">Войти через:</p>
                <div className="oauth-icons">
                    <a href="#"><Google/></a>
                    <a href="#"><Facebook/></a>
                    <a href="#"><Yandex/></a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;