import React, {FC, useState} from 'react';
import styles from './Auth.module.scss'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../../redux/slices/authSlice";
import {useAppDispatch} from "../../redux/store";

const Auth:FC = () => {

    const location = useLocation();
    const isLogin = location.pathname === '/login'
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const submit = async (email: string, password: string) => {
        if(isLogin) {
            const data = await dispatch(login({
                email,
                password
            }))
            if(data.payload){
                navigate('/');
            }
        } else {
            dispatch(registration({
                email,
                password
            }))
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <div className={styles.content}>
                    <h2>{isLogin ? "Login" : "Registration"}</h2>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
                    <div className={styles.downContent}>
                        {isLogin
                            ? <p>Нет aккаунта? <NavLink to="/registration">Зарегистрируйся!</NavLink></p>
                            : <p>Есть aккаунт? <NavLink to="/login">Авторизуйся!</NavLink></p>
                        }
                        <button onClick={() => submit(email, password)}>login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;