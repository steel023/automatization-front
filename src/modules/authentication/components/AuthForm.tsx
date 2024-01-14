import React, {SyntheticEvent, useState} from 'react';
import {emailValid, passwordValid} from "../../../utils/regexp.ts";
import {Button, TextInput} from "@tremor/react";
import {EnvelopeIcon, KeyIcon} from "@heroicons/react/20/solid";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../service";

export interface AuthFormProps {
    isLogin: boolean;
}

function AuthForm({ isLogin }: AuthFormProps) {
    const navigate = useNavigate();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    async function submitHandle(event: SyntheticEvent) {
        event.preventDefault();

        setEmail(email.trim());

        const emailMatches = emailValid(email);
        const passwordMatches = passwordValid(password);

        if (emailMatches && passwordMatches) {
            setButtonLoading(true);
        }

        if (!emailMatches) {
            setEmailError("Введите корректный email");
            return;
        } else {
            setEmailError('');
        }

        if (!passwordMatches) {
            setPasswordError("Введите пароль длиннее 6 символов")
            return;
        } else {
            setPasswordError('');
        }

        if (isLogin) {
            const result = await AuthService.login(email, password);

            console.log("result: " + result)

            if (result === 200) {
                navigate("/")
            } else if(result === 401) {
                setEmailError("Неверный логин или пароль");
            } else if(result === 422) {
                setEmailError("Некорректный email");
            } else {
                setEmailError("Что-то пошло не так");
            }
        } else {
            localStorage.setItem("new", "1");
            const result = await AuthService.register(email, password);

            if (result === 200) {
                navigate("/");
            } else if (result === 422) {
                setEmailError("Email занят другим пользователем");
            } else {
                setEmailError("Что-то пошло не так");
            }
        }

        setButtonLoading(false);
    }

    return (
        <>
            <h2 className="text-2xl font-bold leading-7 text-center text-gray-900 mb-8">{isLogin ? "Вход" : "Регистрация"}</h2>
            <form onSubmit={submitHandle} className="auth-form">
                <TextInput onChange={(event) => {
                    if (isLogin) {
                        setEmail(event.target.value);
                    } else {
                        setEmail(event.target.value.toLowerCase().trim());
                    }
                }} icon={EnvelopeIcon} value={email} placeholder={"Email"}
                           error={emailError != ''} errorMessage={emailError} className="mb-2"/>
                <TextInput onChange={(event) => setPassword(event.target.value)} icon={KeyIcon} placeholder={"Пароль"}
                           className="mt-2 mb-2" type="password" error={passwordError != ''}
                           errorMessage={passwordError}/>

                <Button size="lg" variant="primary" className="w-full mt-4 mb-4" color="blue" loading={buttonLoading}>
                    Готово
                </Button>
            </form>
            <div className="text-sm">
                {isLogin ? "Нет аккаунта?" : "Есть аккаунт?"}&nbsp;
                <Link to={isLogin ? "/auth/register" : "/auth/login"} className="link">{isLogin ? "Зарегистрироваться" : "Войти"}.</Link>
            </div>
        </>
    );
}
export default AuthForm;